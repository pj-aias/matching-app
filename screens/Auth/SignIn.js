import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import authSchema from '../../util/yup.js'
import { sendAPIRequest, setAuthToken } from '../../util/api.js'
import { Button, Input } from 'react-native-elements';

const Signin = ({ navigation }) => {
  const handleSubmit = async (name, password) => {
    console.log(name, password);

    const result = await sendAPIRequest('/login', {
      method: 'POST',
      data: {
        "username": name,
        "password": password,
        "signature": "test"
      }
    })
      .then((res) => {
        console.log(res);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Start' }],
        });
        setAuthToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
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
              title="ログインする" />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default Signin;