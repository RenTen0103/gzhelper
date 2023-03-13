/* eslint-disable no-useless-escape */
export class u {
    lesson: string = '';
    score: string[] = [];
}


// export const getu = () => {
//     return us;
// };


export const praseScore = (code: Array<string>, org: string) => {
    const us: u[] = [];
    let org_S = org.split('t<p<p<l<Text;>;');
    for (let index = 0; index < org_S.length; index++) {
        const element = org_S[index];

        if (code.find(c => {
            return element.indexOf(c) !== -1;
        })) {
            let u1 = new u();
            u1.lesson = org_S[index + 1].match(/l\<(.*?);\>/)![1];
            for (let j = 0; j < 5; j++) {
                const s1 = org_S[index + 7 + j].match(/l\<(.*?);\>/)![1];

                if (s1.indexOf('&nbsp') === -1) {
                    u1.score.push(s1);
                }

            }

            us.push(u1);
        }
    }

    return us;

};

