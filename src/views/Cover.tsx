/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, ToastAndroid} from 'react-native';
import {loginCore} from '../core/login';
import {EventQ} from '../utils/eventQ';
import {getUsername, getpasswd} from '../utils/localData';
import {init} from '../core/init';
import {setLoginState} from '../utils/states';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Score: undefined;
};

type propType = {
  navigation: StackNavigationProp<RootStackParamList>;
};
export function Cover({navigation}: propType) {
  EventQ.privide('ready', () => {
    setLoginState(true);
    const login = async (username: string, passwd: string) => {
      const code = await loginCore(username, passwd);
      if (code === -1) {
        ToastAndroid.show('登录失败！', ToastAndroid.SHORT);
      } else {
        await init();
      }
    };

    let uname = getUsername();
    let p = getpasswd();
    if (!uname && !p) {
      navigation.navigate('Login');
    } else {
      login(uname, p);
    }
  });

  EventQ.privide('loaderr', () => {
    setLoginState(false);
    ToastAndroid.show('未连接到校园网！', ToastAndroid.SHORT);
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Score');
    }, 200);
  }, [navigation]);

  return (
    <Text
      style={{
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 100,
      }}>
      加载中
    </Text>
  );
}
