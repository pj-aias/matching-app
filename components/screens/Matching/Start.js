import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { APIHandler } from '../../../util/api.js'
import Spinner from 'react-native-loading-spinner-overlay';

const Start = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    let res;
    setIsLoading(true);
    try {
      res = await new APIHandler('/matching')
        .withAuth()
        .post()
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return;
    }

    console.log(res);
    navigation.navigate('Match', {
      matchedUser: res.json.matched_user,
      chatroomId: res.json.chatroom.id
    });
  }

  const goToChatIndex = () => {
    navigation.navigate('ChatIndex');
  }

  return (
    <View style={{
      paddingTop: 50,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 50,
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Text style={{
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>マッチングをはじめる</Text>
      <View style={{
        marginTop: 50,
      }}>
        <Button
          title="さっそくはじめる！"
          onPress={handleSubmit}
          style={{
            padding: 10,
          }}
          buttonStyle={{
            backgroundColor: '#00bcd4',
          }}
        />
        <Text style={{
          textAlign: 'center',
          marginTop: 5,
        }}>または</Text>
        <Button
          title="過去のチャットを見る"
          onPress={goToChatIndex}
          buttonStyle={{
            backgroundColor: '#00bcd4',
          }}
          style={{
            marginTop: 5,
            padding: 10,
          }}
        />
      </View>
      <Spinner visible={isLoading} />
    </View>
  );
}

export default Start;