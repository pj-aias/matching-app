import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

class Signin extends React.Component {
  render () {
    return (
      <View>
        <TextInput>
          <Text>Username</Text>
        </TextInput>
        <TextInput>
          <Text>Password</Text>
        </TextInput>
        <Button
          title='Sign In'
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

export default Signin;