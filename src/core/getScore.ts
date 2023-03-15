import { praseScore } from '../utils/dataPrase';
import { jsBridge } from '../utils/jsBridge';
import { getScoreData, setScoreData } from '../utils/localData';
export const getScore = async () => {
    let data = await jsBridge.quryScore() as any;

    let newData = (praseScore(data.code, data.org));
    let res;
    if (!getScoreData() || newData.length !== getScoreData().length) {
        res = newData.filter((e) => !getScoreData()?.some((e2) => e2.lesson === e.lesson));
    }
    setScoreData(newData);

    return res;
};

