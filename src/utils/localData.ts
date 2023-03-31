import {MMKVLoader} from 'react-native-mmkv-storage';
import {score} from '../types/score';

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

export const getScoreDataFromLocal = () => {
    return MKKV.getString('score');
};

export const setScoreDataDiff = (scoreList: Array<score>) => {
    MKKV.setArray('scoreDiff', scoreList);
};
export const getScoreDataDiff = () => {
    return MKKV.getArray<score>('scoreDiff');
};

export const setScoreData = (scoreList: string) => {
    MKKV.setString('score', scoreList);
};

export const setSchedule = (ScheduleList: string) => {
    if (!ScheduleList) {
        return
    }
    MKKV.setString('schedule', ScheduleList);
};

export const setScheduleToday = (ScheduleList: Array<any>) => {
    MKKV.setArray('scheduleToady', ScheduleList);
};

export const getScheduleToday = () => {
    return MKKV.getArray('scheduleToady');
};


export const getScheduleFromLocal = () => {
    return MKKV.getString('schedule');
};

export const loadTime = () => {
    return MKKV.getInt("time")
}
export const saveTime = (time: number) => {
    if (!time) {
        return
    }
    MKKV.setInt("time", time)
}
export const clearAll = () => {
    MKKV.clearStore()
}


