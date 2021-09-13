import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Tor from 'react-native-tor';

export const TestTorScreen = (navigation) => {
  const tor = Tor();
  const [ip, setIp] = useState("")

  useEffect(() => {
    console.log("connecting tor...");
    tor.startIfNotStarted().then((p) => {
      console.log(`running tor on port :${p}`);
    }).catch((err) => {
      console.error(err);
    });
    try {
      tor.get('https://api.ipify.org/?format=json').then(resp => {
        console.log(resp);
        setIp(resp.json.ip);
      });
    } catch (error) {
      console.log("tor error:", error);
    }
  }, [])

  return (
    <View>
      <Text>ip: {ip}</Text>
    </View>
  );
}

export default TestTorScreen;