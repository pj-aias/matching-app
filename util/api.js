import axios from 'axios';
import Tor from 'react-native-tor';
import { NativeModules } from "react-native";

const { DistributedBbsModule } = NativeModules;

export class APIHandler {
    static tor = Tor();
    static authToken = '';

    static scheme = 'http';
    static host = 'yjqictkblqijcsldpwvkd2addy2kc7edpffeg64lhynruy3kxl7s5zid.onion';
    static port = 80;

    static buildApiUrl(path, host = APIHandler.host) {
        return `${APIHandler.scheme}://${host}:${APIHandler.port}${path}`;
    }

    static setAuthToken(tokenString) {
        APIHandler.authToken = tokenString;
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

    async withAIASSig() {
        const signer = await AiasStorage.loadAiasSigner(signer);

        this.headers['X-AIAS'] = await signer.sign(this.body);
        this.headers['AIAS-GMs'] = signer.domains;

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

    async get(data = {}) {
        await this.withAIASSig();
        const headers = this.makeHeaders(data.headers);
        console.log(`GET ${this.endpoint}`);
        return await APIHandler.tor.get(this.url, headers);
    }

    async post(data = {}) {
        await this.withAIASSig();
        const body = data.body ? JSON.stringify(data.body) : '';
        const headers = this.makeHeaders(data.headers);
        console.log(`POST ${this.endpoint}`);
        return await APIHandler.tor.post(this.url, body, headers);
    }

    async delete(data = {}) {
        await this.withAIASSig();
        const body = data.body ? JSON.stringify(data.body) : '';
        const headers = this.makeHeaders(data.headers);
        console.log(`DELETE ${this.endpoint}`);
        return await APIHandler.tor.delete(this.url, body, headers);
    }
}
