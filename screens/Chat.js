import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { sendAPIRequestAuth, showAxiosError } from '../util/api';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // Currently API server doesn't send users, so it will undefined
  const [users, setUsers] = useState([]);

  const { roomId } = route.params;

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(() => {
    sendAPIRequestAuth('/message/' + roomId, {
      method: 'GET'
    }).then((res) => {
      console.log('GET /message');
      console.log(res);
      setMessages(res.data.messages);
      setUsers(res.data.chatroom.users);
    }).catch(showAxiosError);
  }, [roomId]);

  const messagesView = messages.map((m) => <Message content={m.content} user={m.user} />)

  return (
    <View>
      <Text>ユーザ: {users.join(', ')}</Text>
      {messagesView}
      <Button title="Go to Details" onPress={() => { }} />
    </View>
  );
};

const Message = ({ content, user }) => (
  <Text>{user.username}: {content}</Text>
);

export default Chat;