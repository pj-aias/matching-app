import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import authSchema from '../../../util/yup.js';
import { APIHandler } from '../../../util/api';
import { Button, Input } from 'react-native-elements';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (name, password) => {
    console.log(name, password);

    const result = new APIHandler('/user').post({
      body: {
        "username": name,
        "password": password,
        "signature": "test"
      }
    })
      .then((res) => {
        console.log(res);
        APIHandler.setAuthToken(res.json.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Start' }],
        });
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message)
      });
  }

  return (
    <View style={{
      padding: 10,
    }}>
      <Formik
        initialValues={{ name: '', password: '' }}
        validationSchema={authSchema}
        onSubmit={values => handleSubmit(values.name, values.password)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
          dirty,
        }) => (
          <View>
            <Input
              name="name"
              type="text"
              placeholder="メールアドレス"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              autoComplete="true"
            />
            <Input
              name="password"
              type="password"
              placeholder="パスワード"
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            <Button
              disabled={!(isValid && dirty)}
              onPress={handleSubmit}
              title="はじめる" />
            {/* <Text>
              「はじめる」をタップすると、プライバシーポリシーと利用規約に承諾したことになります。
            </Text> */}
          </View>
        )}
      </Formik>
      <Text>{error ? `エラー: ${error}` : ''}</Text>
    </View>
  );
}

export default Signup;