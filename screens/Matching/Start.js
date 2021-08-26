import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const Start = ({ navigation }) => {

  const goToMatching = () => {
    navigation.navigate('Match');
  };

  return (
    <View style={{
      padding: 10,
    }}>
      <Text>マッチングをはじめる</Text>
      <Button
        title="さっそくはじめる！"
        onPress={() => goToMatching()}
      />
    </View>
  );
}

export default Start;