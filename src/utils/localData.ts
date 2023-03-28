import { MMKVLoader } from 'react-native-mmkv-storage';
import { score } from '../types/score';
const MKKV = new MMKVLoader().initialize();
export const getpasswd = () => {
    return MKKV.getString('passwd');
};

export const getUsername = () => {
    return MKKV.getString('username');
};

export const setPasswd = (passwd: string) => {
    MKKV.setString('passwd', passwd);
};

export const setUsername = (passwd: string) => {
    MKKV.setString('username', passwd);
};

export const getScoreData = () => {
    return MKKV.getArray<score>('score');
};

export const setScoreDataDiff = (scoreList: Array<score>) => {
    MKKV.setArray('scoreDiff', scoreList);
};
export const getScoreDataDiff = () => {
    return MKKV.getArray<score>('scoreDiff');
};

export const setScoreData = (scoreList: Array<score>) => {
    MKKV.setArray('score', scoreList);
};

export const setSchedule = (ScheduleList: Array<any>) => {
    MKKV.setArray('schedule', ScheduleList);
};

export const setScheduleToday = (ScheduleList: Array<any>) => {
    MKKV.setArray('scheduleToady', ScheduleList);
};

export const getScheduleToday = () => {
    return MKKV.getArray('scheduleToady');
};


export const getSchedule = () => {
    return MKKV.getArray('schedule');
};

export const clearData = () => {
    MKKV.clearStore();
};
