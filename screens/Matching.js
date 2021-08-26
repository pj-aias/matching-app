import React from 'react';
import { Button, Text, View } from 'react-native';

const Matching = ({ navigation }) => {
  return (
    <View>
      <Text>Matching</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default Matching;
