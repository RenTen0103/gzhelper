import { schedule } from '../types/schedule';
import { score } from '../types/score';


export const praseScore = (code: Array<string>, org: string) => {
    const us: score[] = [];
    let org_S = org.split('至今未通过课程')[0].split('t<p<p<l<Text;>');


    for (let index = 0; index < org_S.length; index++) {
        const element = org_S[index];

        if (!element) {
            break;
        }

        if (code.find(c => {
            return element.indexOf(c) !== -1;
        })) {

            let u1 = new score();
            u1.lesson = org_S[index + 1]?.match(/l<(.*?);>/)![1];
            for (let j = 0; j < 5; j++) {
                const s1 = org_S[index + 7 + j]?.match(/l<(.*?);>/)![1];
                if (!s1) {


                    break;
                }


                if (s1.indexOf('&nbsp') === -1) {
                    u1.score.push(s1);
                }

            }

            us.push(u1);
        }
    }
    return us;
};

export const praseSchedule = (Shedule: any) => {
    let mainSchedule: schedule[][][] = [];

    Shedule.forEach((less1: Array<any>) => {
        let weekL: Array<Array<schedule>> = [];
        less1.forEach((week: Array<Array<string>>) => {
            let dl: Array<schedule> = [];
            week.forEach((l) => {
                let s: schedule = {
                    lesson: '',
                    startWeek: 0,
                    teacher: '',
                    loaction: '',
                    single: 0,
                    endWeek: 0,
                };
                if (l.length <= 1) {
                    dl.push(s);
                } else {
                    s.lesson = l[0] || '';
                    s.teacher = l[2] || '';
                    s.loaction = l[3] || '';

                    let t1 = l[1].match(/\{.*\}/);
                    if (t1?.indexOf('单周') !== -1) {
                        s.single = -1;
                    }
                    if (t1?.indexOf('双周') !== -1) {
                        s.single = 1;
                    }
                    let t2 = t1?.[0].match(/(\d+)-(\d+)/);
                    s.startWeek = parseInt(t2?.[1] || '0', 10);
                    s.endWeek = parseInt(t2?.[2] || '0', 10);
                    s.timeInfo = t1?.[0] || '';
                    dl.push(s);
                }
            });
            weekL.push(dl);
        });
        mainSchedule.push(weekL);
    });

    return mainSchedule;
};

