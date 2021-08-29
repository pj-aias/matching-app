import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { sendAPIRequest } from '../../util/api.js'

const Start = ({ navigation }) => {

  const handleSubmit = async () => {
    const result = await sendAPIRequest('/matching', {
      method: 'POST',
    })
      .then((res) => {
        console.log(res);
        navigation.navigate('Match');
      })
      .catch((err) => {
        console.log(err.message);
      });
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
    </View>
  );
}

export default Start;