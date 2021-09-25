import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { APIHandler } from '../../util/api';
import ChatCard from '../UIParts/ChatCard';

export const getUserNames = chatroom =>
  chatroom.users ? chatroom.users.map(u => u.username).join(', ') : '';

// sync messages every 10 seconds
const syncInterval = 10 * 1000;

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // Currently API server doesn't send users, so it will undefined
  const [room, setRoom] = useState({});
  const [text, setText] = useState('');
  const [title, setTitle] = useState('Loading...');

  const { roomId } = route.params;
  const me = APIHandler.whoami();

  const syncMessages = async () => {
    let res;

    try {
      res = await new APIHandler('/message/' + roomId)
        .withAuth()
        .get();
    } catch (e) {
      console.log(e);
      return;
    }

    console.log('GET /message');
    console.log(res);
    setRoom(res.json.chatroom);
    setMessages(res.json.messages);

    const timer = setTimeout(syncMessages, syncInterval);

    const other = res.json.chatroom.users.filter((u) => u.id !== me.id)[0];
    setTitle(`${other.username} さんとのチャット`);

    return () => {
      clearTimeout(timer);
      APIHandler.stopAll();
    }
  }

  const sendMessage = async content => {
    console.log(`send message "${content}"`);
    let res;
    try {
      res = await new APIHandler(`/message/${roomId}`)
        .setWait()
        .withAuth()
        .post({
          body: { content },
        });
    } catch (e) {
      console.log(e);
      return;
    }

    console.log(res);
    syncMessages();
    setText('');
  };

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(syncMessages, [roomId]);

  // Sync messages periodicaly
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: { usernames } + 'さんとのチャット',
    });
  }, [roomId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: title,
    });

    return () => {
      setRoom({});
      setText("");
      setTitle("");
    }
  }, [roomId, title]);

  const messagesView = messages.map(m => (
    <ChatCard content={m.content} isCurrentUser={m.user.id === me.id} key={m.id} />
  ));
  const usernames = getUserNames(room);

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>{messagesView}</ScrollView>
      <Button title="送信する" onPress={() => sendMessage(text)} />
      <AutoGrowTextInput
        onChangeText={setText}
        value={text}
        placeholder={'メッセージを入力してください'}
      />
    </View>
  );
};

const AutoGrowTextInput = props => {
  const [height, setHeight] = useState(0);

  const fontHeight = 50;
  const textHeight = Math.min(fontHeight, Math.max(fontHeight * 5, height));
  return (
    <TextInput
      {...props}
      multiline={true}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      style={{ height: textHeight }}
    />
  );
};


export default Chat;
