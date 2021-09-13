import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const Match = ({ route, navigation }) => {

  const goToChat = () => {
    navigation.navigate('Chat', {
      roomId: route.params.chatroomId
    });
  };

  const { matchedUser } = route.params;

  return (
    <View style={{
      padding: 10,
    }}>
      <Text>マッチしました！</Text>
      <Text>ユーザ名: {matchedUser.username}</Text>
      <Text>プロフィール: {matchedUser.bio}</Text>
      <Button
        title="さっそくはじめる！"
        onPress={goToChat}
      />
    </View>
  );
}

export default Match;