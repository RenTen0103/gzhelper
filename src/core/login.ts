import { jsBridge } from '../utils/jsBridge';
import AutoCheckCode from '../utils/native';
export const loginCore = async (username: any, passwd: any): Promise<number> => {
    const checkCode = await getCheckCode();

    const m = await jsBridge.Login(username, passwd, checkCode);

    if (m === 'sucess') {
        return 0;
    }
    if (!m || m.indexOf('验证码不正确') !== -1) {
        return new Promise<number>((resolve) => {
            setTimeout(async () => {
                resolve(await loginCore(username, passwd));
            }, 500);
        });

    }


    return -1;
};
const getCheckCode = async () => {
    const imageBase64 = await jsBridge.getCheckCode();
    return await AutoCheckCode.getCheckCode(imageBase64);
};
