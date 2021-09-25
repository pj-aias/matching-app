import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import authSchema from '../../../util/yup.js';
import { APIHandler } from '../../../util/api.js';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

const Signin = ({ navigation }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (name, password) => {
    console.log(name, password);
    setIsLoading(true);
    try {
      const res = await new APIHandler('/login')
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
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  }

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
              title="ログインする"
            />
          </View>
        )}
      </Formik>
      <Text>{error ? `エラー: ${error}` : ''}</Text>
      <Spinner visible={isLoading} />
    </View>
  );
};

export default Signin;
