import React from 'react';
import { Text, View, Button } from 'react-native';

class Sub extends React.Component {
  render () {
    return (
      <View>
        <Text>Sub</Text>
        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}

export default Sub;