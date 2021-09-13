import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Tor from 'react-native-tor';

import { setupTor } from '../../util/api';

export const TestTorScreen = (navigation) => {
  const tor = Tor();
  const [ip, setIp] = useState("")

  useEffect(() => {
    setupTor();
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