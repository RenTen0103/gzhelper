import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {EventQ} from '../utils/eventQ';
import {getSchedule} from '../utils/localData';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Box,
  Text,
  VStack,
  Center,
  AlertDialog,
  Button,
  Pressable,
} from 'native-base';
import {schedule} from '../types/schedule';

import {NativeBaseProvider} from 'native-base';
const week = ['一', '二', '三', '四', '五', '六', '日'];

export let currentWeek = 1;
export function getWeek() {
  let date = new Date();
  var date2 = new Date(date.getFullYear(), 0, 1);
  var day1 = date.getDay();
  if (day1 === 0) {
    day1 = 7;
  }
  var day2 = date2.getDay();
  if (day2 === 0) {
    day2 = 7;
  }
  let d = Math.round(
    (date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) /
      86400000,
  );
  //当周数大于52则为下一年的第一周
  if (Math.ceil(d / 7) + 1 > 52) {
    return 1;
  }
  return Math.ceil(d / 7) + 1;
}

export const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [cs, setce] = useState<schedule>();

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  const [ScheduleTable, setScheduleTable] = useState<schedule[][][]>([[[]]]);
  useEffect(() => {
    const init = () => {
      let ScheduleData = JSON.parse(JSON.stringify(getSchedule()));
      setScheduleTable(ScheduleData);
    };
    init();
    EventQ.privide('initFinish', () => {
      init();
    });

    currentWeek = getWeek() - 11;
  }, []);
  return (
    <>
      <NativeBaseProvider>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.Header>{cs?.lesson}</AlertDialog.Header>
            <AlertDialog.Body>{'地点：' + cs?.loaction}</AlertDialog.Body>
            <AlertDialog.Body>{'教师：' + cs?.teacher}</AlertDialog.Body>
            <AlertDialog.Body>{cs?.timeInfo}</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}>
                  关闭
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <ScrollView>
          <VStack space={4} alignItems="flex-start">
            {ScheduleTable.map((day, index) => {
              return (
                <View key={index} style={[styles.row]}>
                  <Center>
                    <Text>{index + 1}</Text>
                  </Center>

                  {day.map((cell, i) => {
                    return (
                      <VStack flex="1" key={i}>
                        {index === 0 ? (
                          <Text textAlign={'center'}>{week[i]}</Text>
                        ) : (
                          <></>
                        )}

                        <Box
                          h="150"
                          bg={'indigo.300'}
                          rounded="md"
                          shadow={cell.length === 1 ? 0 : 3}
                          overflow={'scroll'}
                          paddingLeft="0.5"
                          paddingRight="0.5">
                          {(() => {
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

                            if (s) {
                              return (
                                <VStack>
                                  <Pressable
                                    onPress={() => {
                                      setIsOpen(!isOpen);
                                      setce(s!);
                                    }}>
                                    <Box>
                                      <Text fontSize="xs">{s?.lesson}</Text>
                                      <Text marginTop={'1'} fontSize="xs">
                                        {s?.loaction}
                                      </Text>
                                    </Box>
                                  </Pressable>
                                </VStack>
                              );
                            }
                          })()}
                        </Box>
                      </VStack>
                    );
                  })}
                </View>
              );
            })}
          </VStack>
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cell: {
    flex: 1,
    height: 150,
    border: 10,
    overflow: 'scroll',
    marginTop: 10,
  },
  line: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  lineText: {
    flex: 1,
  },
});
