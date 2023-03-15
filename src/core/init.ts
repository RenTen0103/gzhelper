import { getLoginState } from '../utils/states';
import { getScore } from './getScore';
import { EventQ } from '../utils/eventQ';
import { getSchedule } from './getSchedule';
import { setScoreDataDiff } from '../utils/localData';
export const init = async () => {

    let loginstate = await getLoginState();

    if (!loginstate) {
        return;
    }

    let newScore = await getScore();
    if (newScore) {
        setScoreDataDiff(newScore);
    } else { setScoreDataDiff([]); }

    await getSchedule();
    EventQ.rreject('initFinish');
};
