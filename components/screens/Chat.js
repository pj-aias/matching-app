import React, {useEffect, useState} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {APIHandler} from '../../util/api';
import ChatCard from '../UIParts/ChatCard';

export const getUserNames = chatroom =>
  chatroom.users ? chatroom.users.map(u => u.username).join(', ') : '';

// sync messages every 10 seconds
const syncInterval = 10 * 1000;

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  // Currently API server doesn't send users, so it will undefined
  const [room, setRoom] = useState({});
  const [text, setText] = useState('');

  const {roomId} = route.params;

  const syncMessages = () => {
    new APIHandler('/message/' + roomId)
      .withAuth()
      .get()
      .then(res => {
        console.log('GET /message');
        console.log(res);
        setRoom(res.json.chatroom);
        setMessages(res.json.messages);
      })
      .catch(console.log);
  };

  const sendMessage = content => {
    console.log(`send message "${content}"`);
    new APIHandler(`/message/${roomId}`)
      .withAuth()
      .post({
        body: {content},
      })
      .then(res => {
        console.log(res);
        syncMessages();
        setText('');
      })
      .catch(console.log);
  };

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(syncMessages, [roomId]);

  // Sync messages periodicaly
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: {usernames} + 'さんとのチャット',
    });
    const timer = setInterval(syncMessages, syncInterval);
    return () => clearInterval(timer);
  }, [roomId]);

  const me = APIHandler.whoami();

  const messagesView = messages.map(m => (
    <ChatCard content={m.content} isCurrentUser={ m.user.id === me.id } />
  ));
  const usernames = getUserNames(room);

  return (
    <View style={{display: 'flex', flex: 1}}>
      <ScrollView style={{flex: 1}}>{messagesView}</ScrollView>
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

  const textHeight = Math.min(35 * 5, Math.max(25, height));
  return (
    <TextInput
      {...props}
      multiline={true}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      style={{height: textHeight}}
    />
  );
};

export default Chat;
