import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-elements";
import { NativeModules, SafeAreaView, View, Linking, Alert } from "react-native";
import { generateAiasSignerFromRoute, AiasStorage } from "../../../aias/Aias";


const URL = 'aias://key_gen?redirect=anomatch:\/\/result/';

const Top = ({ navigation, route }) => {
  const [signature, setSignature] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  Alert.alert(`V8 version is ${global._v8runtime().version}`);

  const msg = "hoge";

  useEffect(async () => {
    let signer;

    console.log(route.params);

    try {
      signer = await AiasStorage.loadAiasSigner(signer);
      const signature = await signer.sign(msg);
      setSignature(signature);
    } catch (e) {
      console.log(e)
      Linking.openURL(URL);
    }

    return () => {
      setSignature("");
      setVerifyResult(false);
    }
  }, []);

  // useEffect(() => {
  //   if (!signature) {
  //     return;
  //   }

  //   DistributedBbsModule.verify(msg, signature, gpk).then((res) => {
  //     console.log({ "verify result": res });
  //     setVerifyResult(res);
  //   });
  // }, [signature])

  const signatureText = signature === "" ? 'signing...' : `signature: ${signature}`;
  const verifyResultText = verifyResult === null ? 'loading...' : `verify result: ${verifyResult}`;

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
      {/* <View>
        <Text>{signatureText}</Text>
      </View>
      <View>
        <Text>{verifyResultText}</Text>
      </View> */}
    </SafeAreaView>
  );
}

export default Top;