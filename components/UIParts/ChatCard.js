import React from 'react';
import {Text, View} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const ChatCard = props => {
  if (props.isCurrentUser) {
    return (
      <View>
        <Text
          style={{
            padding: 8,
            borderColor: 'gray',
            margin: 8,
            width: 200,
            borderRadius: 6,
            backgroundColor: '#4FCDF5',
            color: 'white',
            alignSelf: 'flex-end',
          }}>
          {props.content}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text
          style={{
            padding: 8,
            borderColor: 'gray',
            margin: 8,
            width: 200,
            borderRadius: 6,
            backgroundColor: '#18a4d0',
            color: 'white',
            alignSelf: 'flex-start',
          }}>
          {props.content}
        </Text>
      </View>
    );
  }
};

export default ChatCard;
