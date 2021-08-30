import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { sendAPIRequestAuth, showAxiosError } from '../util/api';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // Currently API server doesn't send users, so it will undefined
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');

  const { roomId } = route.params;

  const sendMessage = (content) => {
    console.log(`send message "${content}"`)
    sendAPIRequestAuth(`/message/${roomId}`, {
      method: 'POSt',
      data: { content }
    })
      .then((res) => {
        console.log(res);
        setMessages(messages.concat([res.data.message]))
      })
      .catch(showAxiosError);
  }

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
      <Button title="送信する" onPress={() => sendMessage(text)} />
      <AutoGrowTextInput onChangeText={setText} value={text} />
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
      style={{ height: textHeight, backgroundColor: 'gray' }}
    />
  )
}

export default Chat;