import axios from 'axios';
import Tor from 'react-native-tor';
import { NativeModules } from "react-native";
import { AiasStorage } from "../aias/Aias";

const { DistributedBbsModule } = NativeModules;

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export class APIHandler {
    static tor = Tor();
    static authToken = '';
    static me = null;

    static scheme = 'http';
    static host = 'yjqictkblqijcsldpwvkd2addy2kc7edpffeg64lhynruy3kxl7s5zid.onion';
    static port = 80;
    static stopAll = false;

    static buildApiUrl(path, host = APIHandler.host) {
        return `${APIHandler.scheme}://${host}:${APIHandler.port}${path}`;
    }

    static setAuthToken(tokenString) {
        APIHandler.authToken = tokenString;
    }

    static setUser(user) {
        APIHandler.me = user;
    }

    static whoami() {
        return this.me;
    }

    static stopAll() {
        this.stopAll = true;
    }

    constructor(endpoint) {
        this.authToken = '';
        this.url = APIHandler.buildApiUrl(endpoint);
        this.endpoint = endpoint
        this.headers = {};
        this.wait = false;
        APIHandler.stopAll = false;
    }

    withAuth() {
        this.headers['Authorization'] = `Bearer ${APIHandler.authToken}`;
        return this;
    }

    setWait() {
        this.wait = true;
        return this;
    }

    async withAIASSig(body) {
        const signer = await AiasStorage.loadAiasSigner(signer);
        const signature = await signer.sign(body);

        this.headers['X-AIAS-Signature'] = JSON.stringify(signature);

        // todo: fix
        this.headers['AIAS-GMs'] = JSON.stringify(signer.domains._W);

        console.log(this.headers)

        return this;
    }

    makeHeaders(headers) {
        return headers
            ? {
                ...this.headers,
                ...headers
            }
            : this.headers;
    }

    async request(data = {}, method) {
        const body = data.body ? JSON.stringify(data.body) : '';

        await this.withAIASSig(body);
        const headers = this.makeHeaders(data.headers);

        // if (APIHandler.wait) {
        //     let data = "";
        //     while (APIHandler.tor.getDaemonStatus() === 'NOTINIT' && !stopAll) {
        //         sleep(3);

        //         try {
        //             await APIHandler.tor.stopIfRunning();
        //         }
        //         catch (e) {
        //             console.log(e);
        //         }
        //     }
        // } else {
        //     try {
        //         await APIHandler.tor.stopIfRunning();
        //     } catch (e) {
        //         throw e;
        //     }
        // }


        try {
            const res = await method(this.url, body, headers);
            // await APIHandler.tor.stopIfRunning();
            return res;
        } catch (e) {
            // await APIHandler.tor.stopIfRunning();
            throw e;
        }
    }

    async get(data = {}) {
        console.log(`GET ${this.endpoint}`);
        return await this.request(data, async (url, _, headers) => {
            return await APIHandler.tor.get(url, headers);
        })
    }

    async post(data = {}) {
        console.log(`POST ${this.endpoint}`);
        return await this.request(data, APIHandler.tor.post)
    }

    async delete(data = {}) {
        console.log(`DELETE ${this.endpoint}`);
        return await this.request(data, APIHandler.tor.delete)
    }
}
