export class jsBridge {
    static getCheckCode: () => Promise<unknown>;
    static Login: (account: any, passwd: any, checkCode: any) => Promise<string>;
    static quryScore: () => Promise<unknown>;
}
