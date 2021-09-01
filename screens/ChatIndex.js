import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { sendAPIRequestAuth, showAxiosError } from '../util/api';
import { getUserNames } from './Chat.js'

const ChatIndex = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(() => {
    sendAPIRequestAuth('/message/rooms', {
      method: 'GET'
    }).then((res) => {
      console.log('get chat index');
      console.log(res);
      setRooms(res.data.chatrooms);
    }).catch(showAxiosError);
  }, []);

  // Returns callback function to open a given chat
  const goToChat = (roomId) => {
    return () => {
      navigation.navigate('Chat', {
        roomId
      });
    }
  };

  const roomsView = rooms.map((r) => <Room key={r.id} room={r} openRoom={goToChat(r.id)} />);

  return (
    <ScrollView>
      <Text>Chatrooms</Text>
      {roomsView}
    </ScrollView>
  )
}


const Room = ({ room, openRoom }) => {
  const usernames = getUserNames(room);

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      <Button title={"開く"} onPress={openRoom} style={{ margin_left: 5 }}></Button>
      <Text>{usernames}</Text>
    </View >
  )
}

export default ChatIndex;