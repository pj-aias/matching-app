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
  }, []);

  const goToChat = (roomId) => {
    return () => {
      navigation.navigate('Chat', {
        roomId
      });
    }
  };

  const roomsView = rooms.map((r) => <Room room={r} openRoom={goToChat(r.id)} />);

  return (
    <View>
      <Text>Chatrooms</Text>
      {roomsView}
    </View>
  )
}


const Room = ({ room, openRoom }) => (
  <View>
    <Text>ユーザ: {room.users.join(', ')}</Text>
    <Button title={"開く"} onPress={openRoom}></Button>
  </View>
)

export default ChatIndex;