import { injectable } from "inversify";

@injectable()
export default class Log {
    constructor() {

    }

    public debug(text: string, separator: boolean = false) {
        if(separator) this.separator();
        console.debug(text);
        if(separator) this.separator();
    }

    private separator() {
        console.log('----------------------------------------------------------------------');
    }
}
