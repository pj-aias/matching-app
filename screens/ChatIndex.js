import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { sendAPIRequestAuth } from '../util/api';

const ChatIndex = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    sendAPIRequestAuth('/message/rooms', {
      method: 'GET'
    }).then((res) => {
      console.log('get chat index');
      console.log(res);
      setRooms(res.data.chatrooms);
    })
  }, [roomId]);

  const goToChat = (roomId) => {
    return () => {
      navigation.navigate('Chat', {
        roomId
      });
    }
  };

  const roomsView = rooms.map((r) => Room(r, goToChat(r.id)));

  return (
    <View>
      <Text>Chatrooms</Text>
      {roomsView}
    </View>
  )
}


const Room = ({ room, openRoom }) => {
  <div>
    <Button onPress={openRoom}>開く</Button>
    <Text>room.users</Text>
  </div>
}

export default ChatIndex;