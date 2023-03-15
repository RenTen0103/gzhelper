import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getScoreData, getScoreDataDiff} from '../utils/localData';
import {useState} from 'react';
import {score} from '../types/score';
import {EventQ} from '../utils/eventQ';
import {Center, NativeBaseProvider, VStack} from 'native-base';
type propType = {
  setHead: (newNumber: number) => void;
};
export const Score = ({setHead}: propType) => {
  let s = 0;
  const [scores, updataScore] = useState<Array<score>>([]);
  const [scoreU, updataScoreu] = useState<Array<score>>([]);
  useEffect(() => {
    const init = () => {
      let scoreData = getScoreData();
      setHead(scoreData.length);
      updataScore(scoreData);
      updataScoreu(getScoreDataDiff());
    };
    init();
    EventQ.privide('initFinish', () => {
      init();
    });
    return () => {};
  }, [setHead]);

  return (
    <>
      <NativeBaseProvider>
        <FlatList
          data={scores}
          renderItem={item => {
            return (
              <VStack space={4} alignItems="center">
                <Center
                  w="80%"
                  h="20"
                  bg={
                    scoreU.find(e => item.item.lesson === e.lesson)
                      ? 'indigo.900'
                      : 'indigo.300'
                  }
                  rounded="md"
                  shadow={3}
                  marginTop="5"
                  marginBottom="5">
                  <Text>{item.item.lesson}</Text>
                  <View style={[styles.score]}>
                    {item.item.score.map((e, i) => {
                      return (
                        <Text style={[styles.score_text]} key={i}>
                          {e}
                        </Text>
                      );
                    })}
                  </View>
                </Center>
              </VStack>
            );
          }}
          keyExtractor={_ => String(s++)}
        />
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: 70,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowOffset: {width: 100, height: 100},
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    display: 'flex',
    justifyContent: 'space-around',
  },
  card_new: {
    width: '80%',
    height: 70,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowOffset: {width: 100, height: 100},
    alignSelf: 'center',
    backgroundColor: '#6e97b9',
    borderRadius: 4,
    shadowColor: 'black',
    display: 'flex',
    justifyContent: 'space-around',
  },
  score: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  score_text: {
    flex: 1,
    textAlign: 'center',
  },
  lastScore: {
    color: 'red',
  },
});
