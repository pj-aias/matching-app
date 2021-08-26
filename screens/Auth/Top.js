import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const Top = ({navigation}) => {

  return (
    <View>
      <View flexDirection="row">
      <Button title="サインイン" 
        onPress={() => { navigation.navigate('Signin') }}
      />
      <Button title="サインアップ" 
        onPress={() => { navigation.navigate('Signup') }}
      />
      </View>
    </View>
  );
}

export default Top;