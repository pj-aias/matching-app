import axios from 'axios';
import Tor from 'react-native-tor';
import { NativeModules } from "react-native";
import { AiasStorage } from "../aias/Aias";

const { DistributedBbsModule } = NativeModules;

class LingQueue {
    constructor(maxLen = 50) {
        this.maxLen = maxLen;
        this.buff = Array(this.maxLen);
        this.head = 0;
        this.count = 0;
    }

    enq(elem) {
        if (this.count > this.maxLen) {
            return false;
        }

        this.count += 1;
        const i = this.head + this.count;
        this.buff[i] = elem;

        return true;
    }

    deq() {
        if (this.count < 1) {
            return null;
        }

        const elem = this.buff[this.head]
        this.buff[this.head] = null;
        this.count -= 1;

        return elem;
    }

    hasAny() {
        this.count >= 1;
    }
}

export class APIHandler {
    static pool = [new TorWorker(), new TorWorker(), new TorWorker()];
    static q = new LingQueue();
    static authToken = '';
    static me = null;

    static scheme = 'http';
    static host = 'yjqictkblqijcsldpwvkd2addy2kc7edpffeg64lhynruy3kxl7s5zid.onion';
    static port = 80;

    static lock = false;

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

    constructor(endpoint) {
        APIHandler.tor.startIfNotStarted();
        this.authToken = '';
        this.url = APIHandler.buildApiUrl(endpoint);
        this.endpoint = endpoint
        this.headers = {};
    }

    withAuth() {
        this.headers['Authorization'] = `Bearer ${APIHandler.authToken}`;
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

    processNext() {
        if (APIHandler.lock) {
            return;
        }

        APIHandler.lock = true;

        while (!APIHandler.q.hasAny) {
            const { req, resolve, reject } = APIHandler.q.deq();

            this.send(...req).then(resolve).catch(reject);
        }

        APIHandler.lock = false;
    }

    request(req) {
        return new Promise((resolve, reject) => {
            if (!APIHandler.q.enq({ req, resolve, reject })) {
                reject("queue is full");
            }

            this.processNext();
        })
    }

    makeHeaders(headers) {
        return headers
            ? {
                ...this.headers,
                ...headers
            }
            : this.headers;
    }

    async send(data = {}, method) {
        const body = data.body ? JSON.stringify(data.body) : '';

        await this.withAIASSig(body);
        const headers = this.makeHeaders(data.headers);

        try {
            const res = await method(this.url, body, headers);
            await APIHandler.tor.stopIfRunning();
            return res;
        } catch (e) {
            await APIHandler.tor.stopIfRunning();
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
