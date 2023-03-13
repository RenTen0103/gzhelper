import { praseScore } from '../utils/dataPrase';
import { jsBridge } from '../utils/jsBridge';
import { setScoreData } from '../utils/localData';
export const getScore = async () => {
    let data = await jsBridge.quryScore() as any;

    setScoreData(praseScore(data.code, data.org));
};

