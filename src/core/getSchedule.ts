import { praseSchedule } from '../utils/dataPrase';
import { jsBridge } from '../utils/jsBridge';
import { setSchedule, setScheduleToday } from '../utils/localData';

export const getSchedule = async () => {
    try {

        const sche = (praseSchedule((JSON.parse(await jsBridge.getSchedule() as string))));
        setSchedule(sche);
        let week = new Date().getDay();
        let today: any[] = [];
        sche.forEach(e => {
            today.push(e[week - 1]);
        });

        setScheduleToday(today);
    } catch (error) {
        console.log(error);

    }

};
