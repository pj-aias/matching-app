import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import authSchema from '../../../util/yup.js';
import { APIHandler } from '../../../util/api';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const Signup = ({ navigation }) => {
  const [error, setError] = useState('');
  let isLoading = false
  const handleSubmit = async (name, password) => {
    console.log(name, password);
    isLoading = true
    try {
      const res = await new APIHandler('/user')
        .post({
          body: {
            username: name,
            password: password,
            signature: 'test',
          },
        });

      console.log(res);
      APIHandler.setAuthToken(res.json.token);
      APIHandler.setUser(res.json.user);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });
      isLoading = false
    } catch (err) {
      console.log(err.message);
      isLoading = false
      setError(err.message);
    }
  };

  return (
    <View
      style={{
        padding: 10,
      }}>
      <Formik
        initialValues={{ name: '', password: '' }}
        validationSchema={authSchema}
        onSubmit={values => handleSubmit(values.name, values.password)}>
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
            <TextInput
              name="name"
              type="text"
              placeholder="メールアドレス"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              autoComplete="true"
            />
            <TextInput
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
              title="はじめる"
            />
            {/* <Text>
              「はじめる」をタップすると、プライバシーポリシーと利用規約に承諾したことになります。
            </Text> */}
          </View>
        )}
      </Formik>
      <Text>{error ? `エラー: ${error}` : ''}</Text>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default Signup;
