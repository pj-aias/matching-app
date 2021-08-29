import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { sendAPIRequestAuth } from '../util/api';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  const { roomId } = route.params;

  useEffect(() => {
    sendAPIRequestAuth('/message/' + roomId, {
      method: 'GET'
    }).then((res) => {
      console.log('GET /message');
      console.log(res);
      setMessages(res.data.messages);
    })
  }, [roomId]);

  const messagesView = messages.map((m) => <Message content={m.content} user={m.user} />)

  return (
    <View>
      <Text>Chat</Text>
      {messagesView}
      <Button title="Go to Details" onPress={() => { }} />
    </View>
  );
};

const Message = ({ content, user }) => (
  <Text>{user.username}: {content}</Text>
);

export default Chat;