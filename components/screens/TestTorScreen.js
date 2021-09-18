import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Tor from 'react-native-tor';

import { sendAPIRequest, setupTor, showAxiosError } from '../../util/api';

export const TestTorScreen = (navigation) => {
  useEffect(() => {
    setupTor();
    sendAPIRequest('GET', '/').then(console.log).catch(showAxiosError);
  }, []);

  return (
    <View>
      <Text>test</Text>
    </View>
  );
}

export default TestTorScreen;