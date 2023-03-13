import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getScoreData} from '../utils/localData';
import {useState} from 'react';
import {score} from '../types/score';
import {EventQ} from '../utils/eventQ';
export const Score = () => {
  let s = 0;
  const [scores, updataScore] = useState<Array<score>>([]);
  const init = () => {
    updataScore(getScoreData());
  };

  useEffect(() => {
    init();
    EventQ.privide('initFinish', () => {
      init();
    });
  }, []);

  return (
    <FlatList
      data={scores}
      renderItem={item => {
        return (
          <View style={[styles.card]}>
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
          </View>
        );
      }}
      keyExtractor={_ => String(s++)}
    />
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
