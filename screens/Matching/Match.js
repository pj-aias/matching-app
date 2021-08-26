import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const Match = ({ navigation }) => {

  const goToMatching = () => {
    navigation.navigate('Match');
  };

  return (
    <View style={{
      padding: 10,
    }}>
      <Text>マッチしました！</Text>
      <Button
        title="さっそくはじめる！"
      />
    </View>
  );
}

export default Match;