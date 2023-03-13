import { getLoginState } from '../utils/states';
import { getScore } from './getScore';
import { EventQ } from '../utils/eventQ';
export const init = async () => {

    let loginstate = await getLoginState();

    if (!loginstate) {
        return;
    }

    await getScore();
    EventQ.rreject('initFinish');
};
