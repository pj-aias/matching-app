import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { NativeModules, Text, Button } from "react-native-elements";

const { DistributedBbs } = NativeModules;

const Top = ({ navigation }) => {
  console.log('module: ', DistributedBbs)

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View flexDirection="row">
        <Button title="サインイン"
          onPress={() => { navigation.navigate('Signin') }}
        />
        <Button title="サインアップ"
          onPress={() => { navigation.navigate('Signup') }}
        />
        <Text>number from rust: {DistributedBbs.rust_number()}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Top;