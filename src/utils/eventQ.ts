export class EventQ {
    static elist: Map<string, Function> = new Map();

    static privide(key: string, cb: Function) {
        this.elist.set(key, cb);
    }

    static rreject(key: string, param?: any) {

        if (this.elist.has(key)) {
            this.elist.get(key)!(param);
        }
    }

    static reject(key: string, param?: any) {
        if (key === 'message') {
            console.log(param);
        }
        if (this.elist.has(key)) {
            this.elist.get(key)!(param);
            this.elist.delete(key);
        }
    }
}
