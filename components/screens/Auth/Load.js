import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-elements";
import { NativeModules, SafeAreaView, View, Linking, Alert } from "react-native";
import { generateAiasSignerFromRoute, AiasStorage } from "../../../aias/Aias";



const Load = ({ navigation, route }) => {
    const [signature, setSignature] = useState("");
    const [verifyResult, setVerifyResult] = useState(null);

    const msg = "hoge";

    useEffect(async () => {
        const signer = generateAiasSignerFromRoute(route);
        await AiasStorage.saveAiasSigner(signer);
        Alert.alert("連携が完了しました");

        const signature = await signer.sign(msg);
        setSignature(signature);

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
                <Button title="サインイン(Load)"
                    onPress={() => { navigation.navigate('Signin') }}
                />
                <Button title="サインアップ"
                    onPress={() => { navigation.navigate('Signup') }}
                />
            </View>
            <View>
                <Text>{signatureText}</Text>
            </View>
            <View>
                <Text>{verifyResultText}</Text>
            </View>
        </SafeAreaView>
    );
}

export default Load;