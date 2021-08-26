import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Sub from './screens/Sub';
import Signin from './screens/Auth/SignIn';
import Signup from './screens/Auth/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sign up"
            component={Signup}
          />
          <Stack.Screen
            name="Sign in"
            component={Signin}
          />
        </Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Sub"
          component={Sub}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;