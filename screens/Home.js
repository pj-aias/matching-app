import React from 'react';
import { Button, Text, View } from 'react-native';

class Home extends React.Component {
  render () {
    return (
      <View>
        <Text>Home</Text>
        <Button title="Add" onPress={() => {
          this.props.navigation.navigate('Sub');
        }}/>
      </View>
    );
  }
}

export default Home;