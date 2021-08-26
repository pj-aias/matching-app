import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import authSchema from '../../util/yup.js'
import { Button, Input } from 'react-native-elements';

const Signup = () => {
  const handleSubmit = async (name, password) => {
    console.log(name, password);
    try {

    } catch (err) {

    }
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
    </View>
  );
}

export default Signup;