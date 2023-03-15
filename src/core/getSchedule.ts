import { praseSchedule } from '../utils/dataPrase';
import { jsBridge } from '../utils/jsBridge';
import { setSchedule } from '../utils/localData';

export const getSchedule = async () => {
    setSchedule(praseSchedule((JSON.parse(await jsBridge.getSchedule() as string))));
};
