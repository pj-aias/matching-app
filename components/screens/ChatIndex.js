import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { APIHandler } from '../../util/api';
import { getUserNames } from './Chat.js';
import Spinner from 'react-native-loading-spinner-overlay';
const ChatIndex = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const me = APIHandler.whoami();

  // Get messages from API after render (effect), and store them to variable if succeeded
  useEffect(async () => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'チャットルーム',
    });

    let res;
    setIsLoading(true);
    try {
      res = await new APIHandler('/message/rooms')
        .withAuth()
        .get()
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      setIsLoading(false)
      return;
    }

    console.log("chat index res:", res);
    setRooms(res.json.chatrooms);

    return () => {
      setRooms([]);
    }
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

  return <View>
    <ScrollView>{roomsView}</ScrollView>
    <Spinner visible={isLoading} />
  </View>;
};

const Room = ({ room, openRoom }) => {
  const me = { id: 1 };
  const otherUser = room.users.filter((u) => u.id !== me.id)[0];
  console.log("hoge: ", otherUser);

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
