import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { sendAPIRequestAuth } from '../util/api';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // currently API server doesn't send users, so it will undefined
  const [users, setUsers] = useState([]);

  const { roomId } = route.params;

  useEffect(() => {
    sendAPIRequestAuth('/message/' + roomId, {
      method: 'GET'
    }).then((res) => {
      console.log('GET /message');
      console.log(res);
      setMessages(res.data.messages);
      setUsers(res.data.chatroom.users);
    })
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