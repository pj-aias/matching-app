import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { APIHandler } from '../../util/api';
import { getUserNames } from './Chat.js';

const ChatIndex = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [otherUser, setOtherUser] = useState(null);

  const me = APIHandler.whoami();

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'チャットルーム',
    });
    new APIHandler('/message/rooms')
      .withAuth()
      .get()
      .then(res => {
        console.log('get chat index');
        console.log(res);
        setRooms(res.json.chatrooms);

        const user = res.json.chatroom.users.filter((u) => u.id !== me.id)[0];
        setOtherUser(other)
      })
      .catch(console.log);
  }, []);

  // Returns callback function to open a given chat
  const goToChat = roomId => {
    return () => {
      navigation.navigate('Chat', {
        roomId,
      });
    };
  };

  const roomsView = rooms.map(r => (
    <Room key={r.id} room={r} openRoom={goToChat(r.id)} />
  ));

  return <ScrollView>{roomsView}</ScrollView>;
};

const Room = ({ room, openRoom }) => {
  const usernames = getUserNames(room);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        height: 96,
        shadowColor: '#a7a7a7',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 14,
        shadowOpacity: 0.25,
        elevation: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 6,
        padding: 20,
      }}
      onPress={openRoom}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        {otherUser.username}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatIndex;
