import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { sendAPIRequestAuth, showAxiosError } from '../util/api';

const ChatIndex = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    sendAPIRequestAuth('/message/rooms', {
      method: 'GET'
    }).then((res) => {
      console.log('get chat index');
      console.log(res);
      setRooms(res.data.chatrooms);
    }).catch(showAxiosError);
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
    <ScrollView>
      <Text>Chatrooms</Text>
      {roomsView}
    </ScrollView>
  )
}


const Room = ({ room, openRoom }) => (
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',

  }}>
    <Button title={"開く"} onPress={openRoom}></Button>
    <Text>ユーザ: {room.users.join(', ')}</Text>
  </View>
)

export default ChatIndex;