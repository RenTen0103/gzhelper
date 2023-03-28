import { NativeModules } from 'react-native';

export default NativeModules.AutoCheckCode;

export const login: (un: string, passd: string) => Promise<string> = NativeModules.zfCore.Login;
export const getScoreData: () => Promise<string> = NativeModules.zfCore.getScoreData;

