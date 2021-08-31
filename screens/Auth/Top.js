import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { NativeModules } from 'react-native';

const { MobileAppBridge } = NativeModules;

const a = MobileAppBridge.sign("", "", "", "", "");
const Top = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View flexDirection="row">
        <Button title="サインイン"
          onPress={() => { navigation.navigate('Signin') }}
        />
        <Button title="サインアップ"
          onPress={() => { navigation.navigate('Signup') }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Top;