import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-elements";
import { NativeModules, SafeAreaView, View } from "react-native";

const { DistributedBbsModule } = NativeModules;

//const a = MobileAppBridge.sign("", "", "", "", "");
const Top = ({ navigation }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    DistributedBbsModule.getRustNumber().then(setNumber);
  }, [])

  console.log('module: ', DistributedBbsModule)
  console.log('modules: ', NativeModules);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View flexDirection="row">
        <Button title="サインイン"
          onPress={() => { navigation.navigate('Signin') }}
        />
        <Button title="サインアップ"
          onPress={() => { navigation.navigate('Signup') }}
        />
        <Text>number from rust: {number}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Top;