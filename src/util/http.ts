import * as axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export default class http {
    constructor() {

    }

    public get = async (url: string, data?: object, header?: object, params?: string[]) => {
        return await axios.default.get(url, {
            data: data,
            headers: header,
            params: params
        });
    }

    public async post(url: string, data?: object, header?: object, params?: string[]) {
        return await axios.default.post(url, {
            data: data,
            headers: header,
            params: params
        });
    }

    public async delete(url: string, data?: object, header?: object, params?: string[]) {
        return await axios.default.delete(url, {
            data: data,
            headers: header,
            params: params
        });
    }

    public async put(url: string, data?: object, header?: object, params?: string[]) {
        return await axios.default.put(url, {
            data: data,
            headers: header,
            params: params
        });
    }
}
