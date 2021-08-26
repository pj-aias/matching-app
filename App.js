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

class App extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Sub"
            component={Sub}
          />
          <Stack.Screen
            name="Sign in"
            component={Signin}
          />
          <Stack.Screen
            name="Sign up"
            component={Signup}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;