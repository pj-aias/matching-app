import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { sendAPIRequestAuth, showAxiosError } from '../util/api';

export const getUserNames = (chatroom) => (
  chatroom.users
    ? chatroom.users.map((u) => u.username).join(', ')
    : ''
);

// sync messages every 10 seconds
const syncInterval = 10 * 1000;

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // Currently API server doesn't send users, so it will undefined
  const [room, setRoom] = useState({});
  const [text, setText] = useState('');

  const { roomId } = route.params;

  const syncMessages = () => {
    sendAPIRequestAuth('/message/' + roomId, {
      method: 'GET'
    }).then((res) => {
      console.log('GET /message');
      console.log(res);
      console.log(res.data);
      setMessages(res.data.messages);
      setRoom(res.data.chatroom);
    }).catch(showAxiosError);
  }

  const sendMessage = (content) => {
    console.log(`send message "${content}"`)
    sendAPIRequestAuth(`/message/${roomId}`, {
      method: 'POSt',
      data: { content }
    })
      .then((res) => {
        console.log(res);
        syncMessages();
        setText('');
      })
      .catch(showAxiosError);
  }

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(syncMessages, [roomId]);

  // Sync messages periodicaly
  useEffect(() => {
    const timer = setInterval(syncMessages, syncInterval);
    return () => clearInterval(timer);
  }, [roomId]);

  const messagesView = messages.map((m) => <Message key={m.id} content={m.content} user={m.user} />);
  const usernames = getUserNames(room);

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <Text>ユーザ: {usernames}</Text>
      <ScrollView style={{ flex: 1 }}>
        {messagesView}
      </ScrollView>
      <Button title="送信する" onPress={() => sendMessage(text)} />
      <AutoGrowTextInput onChangeText={setText} value={text} placeholder={"メッセージを入力してください"} />
    </View>
  );
};

const Message = ({ content, user }) => (
  <Text>{user.username}: {content}</Text>
);

const AutoGrowTextInput = (props) => {
  const [height, setHeight] = useState(0);

  const textHeight = Math.min(35 * 5, Math.max(25, height));
  return (
    <TextInput
      {...props}
      multiline={true}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      style={{ height: textHeight }}
    />
  )
}

export default Chat;