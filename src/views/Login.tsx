import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from 'react-native';
import {RootStackParamList} from '../core';
import {loginCore} from '../core/login';
import {setPasswd, setUsername} from '../utils/localData';
import {init} from '../core/init';
import { CommonActions } from '@react-navigation/native';

type propType = {
  navigation: StackNavigationProp<RootStackParamList>;
};
export function LoginView({navigation}: propType) {
  const [username, usernameChange] = useState('');
  const [passwd, passwdchange] = useState('');

  const submit = async () => {
    let c = await loginCore(username, passwd);
    if (c === 0) {
      setPasswd(passwd);
      setUsername(username);
      ToastAndroid.show('登录中...', ToastAndroid.SHORT);
      setTimeout(async () => {
        await init();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'main'}],
          }),
        );
      }, 200);
    } else {
      ToastAndroid.show('用户名或密码错误！', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.square]}>
        <Text style={[styles.loginText]}>登录</Text>
        <View style={[styles.barSize]}>
          <Text style={[styles.inputTag]}>用户名</Text>
          <TextInput
            onChangeText={text => usernameChange(text)}
            value={username}
            style={[styles.input]}
          />
        </View>
        <View style={[styles.barSize]}>
          <Text style={[styles.inputTag]}>密 码</Text>
          <TextInput
            onChangeText={text => passwdchange(text)}
            value={passwd}
            style={[styles.input]}
            secureTextEntry={true}
          />
        </View>
        <View style={[styles.barSize]}>
          <View style={[styles.submitBotton]}>
            <View style={[styles.inner]}>
              <Button title="提交" onPress={submit} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  square: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '25%',
    height: '70%',
    width: '90%',
    shadowOffset: {width: 100, height: 100},
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    elevation: 2,
  },
  controls: {
    paddingHorizontal: 12,
  },
  imgs: {
    width: 100,
    height: 40,
  },
  loginText: {
    fontSize: 40,
    fontStyle: 'italic',
  },
  barSize: {
    height: 40,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    flex: 4,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
  inputTag: {
    flex: 1,
    textAlignVertical: 'center',
  },
  submitBar: {
    height: 40,
    width: '80%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  submitBotton: {
    flex: 1,
  },
  inner: {
    width: '100%',
  },
});
