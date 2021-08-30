import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { sendAPIRequestAuth, showAxiosError } from '../../util/api.js'

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
      padding: 10,
    }}>
      <Text>マッチングをはじめる</Text>
      <Button
        title="さっそくはじめる！"
        onPress={handleSubmit}
      />
      <Text>または</Text>
      <Button
        title="過去のチャットを見る"
        onPress={goToChatIndex}
      />
    </View>
  );
}

export default Start;