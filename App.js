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

const theme = {
  headerStyle: {
    backgroundColor: '#4FCDF5',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            name="Home"
            component={Home}
            options={theme}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={theme}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;