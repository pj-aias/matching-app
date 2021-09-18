import React, { useEffect, useState } from "react";
import { Text, Button } from "react-native-elements";
import { NativeModules, SafeAreaView, View } from "react-native";

const { DistributedBbsModule } = NativeModules;

//const a = MobileAppBridge.sign("", "", "", "", "");
const Top = ({ navigation }) => {
  const [number, setNumber] = useState(0);
  const [signature, setSignature] = useState("");

  console.log('module: ', DistributedBbsModule)
  console.log('modules: ', NativeModules);

  const msg = "hoge";
  const cred = "kZOS3AAgzPRvzPbMnMzFZDDMu1tlzJJSzMMuzPPM+lw8zJTMqVJ5c8zIXCwGIMyHYszIDNwAMMyQPsymzMvMjVLM4MyxzOkdzNwMzKdvzLfMgszYzM3M2kQDzJLMwszZzKDM1My8CgzMmMzBzPoPzMTMvERlDVogzLjMkTMbzK7M2MzFTZLcACBAzPkSzL3MvsyvUH9NzOvMzVEVQMy4zPjMxMzrzMgDzKTMrszoHMyxE8yMQMyAzP9eONwAMMy5c1nMucyTdh3M18zILwTMxVjMg1NfdTjMx3LMncyBJGJvzIswJU7M137MuQx0McyZzPIJakEnM8yYzK4NYMzOa5LcACDMrsyOQyYYzJTMyBvMxMzkDszAzKUVLmECUwXM9MzLzMFoInvMncykDczwzOLM5RvcADDMkcz6zPzMpMzMzPnMpkHMmAQbR8z7GMzHzM7MpMzRzLdzK8zTzMzM0MyjzOYfUXTMkcyIzMzMpxwNzL4hzNZxzM8szPUGSszMzMXM1mI=";
  const gpk = "ldwAMMy1UczUKDjM8BbMjmXM28yXMhgdTUTMpCF8dczSSMzLe0AsMsyDPDgLzKLM0gXMn2PMvknMpsyZVjATG1TMpRrMutwAMMyrzN8VY1I5zPB3QD/MuQpkzNVOzIbM8FjMuMyybMydzPDM1szIzLrMucyTPB03W8zTzJUnzOXM4wbM48yTH8z8zJMfSszZzKY13AAwzJbM1BYqaGtkb8zmXTHM4MzqzKFUEMzgJHDMyczNdiALcczjzIENEARGF0FpzOpRSgDM4kfM7TLMwsytzLJKzLbM8NwAMMyTJDQvH8yAzMwbUTAJEmFTeXBPzInMusyfzKjMzwoRBMzuO1bM62fMzXAnzI8mzOIYzLLM8z7M5szOzI4xasz4f8ylk5LcADDMuczMzL01P3/MtErMuHPMtcznY8zhYcywzLY9zII4YTJ+DwXMwyjMvcyqMhdiZAXMqRzMoszHZ8zYzLvMs8zyzMPMnwnM3syJ3ABgzIZVDjkdzJLMk8yJzLcHzLfMjHsSL0wuzI8XzLg+zMPMn8yAXMzmIhAEYXrMlztWExEhDMyzWCHM0cyXSyvMwnDMhgbMjVV7AcyizIzM0TtJEszszJomCszSLhvMvczpTgpozLNkX1rMjsyMIGh3RWTMuwUsWCTMkiwyzJrMkszfOWgkktwAMMywzMJ2zP/MozrMiMyqOszVB8yMzMUpzJVtzIbM6FfMoBd1zPw8WszLD1bMhTh/cMyPe1wxQTDM6R7Mh0hhMHxNzKjMo9wAYMyqchU6zKcYHczJzLN0zOrMmcy/zIPMuAvMszkQBhTM+czozPdlzPdPzPVdzJfMn8zBzIjMyQhya8zszL3MwjoBzJ5ZzKokT8yMAMy8zIQmLAnMusynzOJqzORmzJLMj2BUXiXMwsy7LVPM8sytzLzM5AEAGsymzLzMlmTMxGjM/8yBzIvMhMyGzMo2zLDMt8zBzIfMnczYktwAMMySzJ7M1QhgUsyHbMz1WszwzPUnzIxmVszXbFjMvFV9VwTMnCQuWSLMtczvzOYazLolzJHMqszdzO7M4y0TJRkPR3dQ3ABgzK3MjljMp8zCcBnM38yVP8zhGcydzKXMnsyjFxNrzJPM08ypzLzMoWXMvUbMwMyefMyYO2ljzJQWKwbM08zczOAQFcyDW8yvTnIXzK/M4cyCDcyFzLdNzP9tL13M8nTM3lQRzJp6zJLMiFrM5jsYez0ZKF0VzJtAzILM+24kzPTMwcz5zKMzzK7MzX7MrSQK";
  const seed = "aG9nZWhvZ2Vob2dlaG9nZWhvZ2Vob2dlaG9nZWhvZ2U=";

  useEffect(() => {
    DistributedBbsModule.getRustNumber()
      .then(setNumber)
      .catch(console.error);

    DistributedBbsModule.sign(msg, cred, gpk, seed)
      .then((s) => {
        setSignature(s);
        console.log({ signature: s });
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (!signature) {
      return;
    }

    let sig = signature.slice(0, signature.length);

    DistributedBbsModule.verify(msg, sig, gpk).then((res) => {
      console.log({ "verify result": res });
    });
  }, [signature])

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
      <View>
        <Text>{number ? `number from rust: ${number}` : "calling rust..."}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Top;