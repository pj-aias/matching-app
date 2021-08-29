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
        navigation.navigate('Match');
      })
      .catch(showAxiosError);
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