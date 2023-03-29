import {NativeModules} from 'react-native';

export default NativeModules.AutoCheckCode;

export const login: (un: string, passwd: string) => Promise<string> = NativeModules.zfCore.Login;
export const getCodeList: () => Promise<string> = NativeModules.zfCore.getScoreData;
export const getScoreData: () => Promise<string> = NativeModules.zfCore.getCodeList;

