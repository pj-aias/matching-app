import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { sendAPIRequestAuth, showAxiosError } from '../../../util/api.js'

const Start = ({ navigation }) => {

  const handleSubmit = async () => {
    const result = await sendAPIRequestAuth('/matching', {
      method: 'POST',
    })
      .then((res) => {
        console.log(res);
        navigation.navigate('Match', {
          matchedUser: res.data.matched_user,
          chatroomId: res.data.chatroom.id
        });
      })
      .catch(showAxiosError);
  }

  const goToChatIndex = () => {
    navigation.navigate('ChatIndex');
  }

  return (
    <View style={{
      paddingTop: 50,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 50,
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Text style={{
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>マッチングをはじめる</Text>
      <View style={{
        marginTop: 50,
      }}>
        <Button
          title="さっそくはじめる！"
          onPress={handleSubmit}
          style={{
            padding: 10,
          }}
          buttonStyle={{
            backgroundColor: '#00bcd4',
          }}
        />
        <Text style={{
          textAlign: 'center',
          marginTop: 5,
        }}>または</Text>
        <Button
          title="過去のチャットを見る"
          onPress={goToChatIndex}
          buttonStyle={{
            backgroundColor: '#00bcd4',
          }}
          style={{
            marginTop: 5,
            padding: 10,
          }}
        />
      </View>
    </View>
  );
}

export default Start;