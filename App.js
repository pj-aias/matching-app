import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import Match from './components/screens/Matching/Match';
import Top from './components/screens/Auth/Top';
import Signin from './components/screens/Auth/SignIn';
import Signup from './components/screens/Auth/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Chat from './components/screens/Chat';
import Start from './components/screens/Matching/Start';
import ChatIndex from './components/screens/ChatIndex';
import TestTorScreen from './components/screens/TestTorScreen';
import { APIHandler } from './util/api';

const theme = {
  headerStyle: {
    backgroundColor: '#4FCDF5',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Stack = createStackNavigator();

const config = {
  screens: {
    TOP: {
      path: 'result',
      parse: {
        result: (data) => `?result=${data}`,
      },
      stringify: {
        result: (data) => {
          return data.replace(/^\?result=/, '');
        },
      },
    },
  },
};

const linking = {
  prefixes: ['https://anomatch.com', 'anomatch://'],
  config,
};

const App = () => {
  // prefetch to establish TCP connection to API server
  // useEffect(() => {
  //   new APIHandler('/').get().then(console.log);
  // }, []);

  return (
    // <SafeAreaProvider>
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen
          name="TOP"
          component={Top}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={theme}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={theme}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={theme}
        />
        <Stack.Screen
          name="Match"
          component={Match}
          options={theme}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={theme}
        />
        <Stack.Screen
          name="ChatIndex"
          component={ChatIndex}
          options={theme}
        />
        <Stack.Screen
          name="TestTor"
          component={TestTorScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default App;
