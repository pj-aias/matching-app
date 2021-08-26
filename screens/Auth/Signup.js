import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

class Signup extends React.Component {
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
          title='Sign up'
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

export default Signup;