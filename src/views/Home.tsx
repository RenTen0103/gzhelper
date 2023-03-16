import {
  NativeBaseProvider,
  VStack,
  HStack,
  Center,
  Pressable,
  Text,
  ScrollView,
} from 'native-base';
import React, {useEffect} from 'react';
import {getLoginState} from '../utils/states';
import {useState} from 'react';
import {clearData, getScheduleToday, getUsername} from '../utils/localData';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../core';
import {CommonActions} from '@react-navigation/native';
import {jsBridge} from '../utils/jsBridge';
import {schedule} from '../types/schedule';
import {getWeek} from './Schedule';
import {EventQ} from '../utils/eventQ';
import {init} from '../core/init';
import {ToastAndroid} from 'react-native';
type propType = {
  navigation: StackNavigationProp<RootStackParamList>;
};

let currentWeek = 1;

export const Home = ({navigation}: propType) => {
  const [loginstate, setloginstate] = useState(false);
  const [userNmae, setUsename] = useState('');
  const [scheduleToady, setSchedule] = useState<schedule[][]>([]);
  const logout = async () => {
    clearData();
    await jsBridge.resite();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };
  const reInit = async () => {
    ToastAndroid.show('正在刷新...', ToastAndroid.SHORT);
    await init();
  };

  useEffect(() => {
    const initt = async () => {
      setUsename(getUsername());
      currentWeek = getWeek() - 11;
      let loginState = await getLoginState();
      setloginstate(loginState);
      setSchedule((getScheduleToday() as any) || []);
    };

    initt();
    EventQ.privide('initFinish', () => {
      initt();
    });
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <VStack
          w="100%"
          h="100%"
          alignSelf={'center'}
          alignItems={'center'}
          marginTop="2">
          <HStack
            w="80%"
            justifyContent="space-evenly"
            bg="primary.300"
            rounded="md"
            shadow={3}
            height="70">
            <Center>{userNmae}</Center>
            <Center>
              <Pressable
                onPress={reInit}
                rounded="full"
                bg={loginstate ? 'green.500' : 'red.400'}
                alignSelf="center"
                py="3"
                px="3"
                w="30"
                h={30}
              />
              <Text w={'100%'} marginTop="2" alignSelf={'center'}>
                登录状态
              </Text>
            </Center>
            <Center>
              <Pressable
                rounded="sm"
                bg={loginstate ? 'green.500' : 'red.400'}
                alignSelf="center"
                py="1"
                px="3"
                onPress={logout}>
                <Text
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                  color="white">
                  退出
                </Text>
              </Pressable>
            </Center>
          </HStack>
          <ScrollView w="100%">
            <VStack
              w="100%"
              justifyContent="space-evenly"
              alignItems={'center'}>
              {scheduleToady.map((cell, index) => {
                let s: schedule | undefined = cell.find(e => {
                  return (
                    e.startWeek <= currentWeek &&
                    e.endWeek >= currentWeek &&
                    e.lesson !== '' &&
                    (e.single === 0 ||
                      (e.single === -1 && currentWeek % 2 === 1) ||
                      (e.single === 1 && currentWeek % 2 === 0))
                  );
                });

                return (
                  <Center
                    key={index}
                    rounded="md"
                    shadow={3}
                    w="80%"
                    h="90"
                    bg={'indigo.300'}
                    marginTop="10">
                    <Text>{s?.lesson}</Text>
                    <Text>{s?.loaction}</Text>
                  </Center>
                );
              })}
            </VStack>
          </ScrollView>
        </VStack>
      </NativeBaseProvider>
    </>
  );
};
