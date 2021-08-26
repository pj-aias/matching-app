import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from './screens/Home';
import Top from './screens/Auth/Top';
import Signin from './screens/Auth/SignIn';
import Signup from './screens/Auth/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Chat from './screens/Chat';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="TOP"
            component={Top}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
          />
        </Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;