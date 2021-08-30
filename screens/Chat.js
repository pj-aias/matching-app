import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

  const messagesView = messages.map((m) => <Message key={m.id} content={m.content} user={m.user} />)

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <Text>ユーザ: {users.join(', ')}</Text>
      <ScrollView style={{ flex: 1 }}>
        {messagesView}
      </ScrollView>
      <Button title="Go to Details" onPress={() => { }} />
      <AutoGrowTextInput />
    </View>
  );
};

const Message = ({ content, user }) => (
  <Text>{user.username}: {content}</Text>
);

const AutoGrowTextInput = ({ props }) => {
  const [height, setHeight] = useState(0);
  const [text, setText] = useState('');

  const textHeight = Math.min(35 * 5, Math.max(25, height));
  return (
    <TextInput
      {...props}
      multiline={true}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      onChangeText={setText}
      value={text}
      style={{ height: textHeight, backgroundColor: 'gray' }}
    />
  )
}

export default Chat;