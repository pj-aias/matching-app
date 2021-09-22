import axios from 'axios';
import { EventEmitter } from 'react-native';
import Tor from 'react-native-tor';

class DirectAPI {
    constructor() { }

    startIfNotStarted() { }

    async get(url, headers, trustSSL) {
        let resp = await axios({
            method: 'GET',
            url,
            headers,
        });

        resp.json = resp.data

        return resp
    }

    async post(url, body, headers, trustSSL) {
        let resp = await axios({
            method: 'POST',
            url,
            headers,
            data: body,
        })
        resp.json = resp.data;

        return resp;
    }

    async delete(url, body, headers, trustSSL) {
        let resp = await axios({
            method: 'DELETE',
            url,
            headers,
            data: body,
        });

        resp.json = resp.data;
        return resp;
    }
}

export class APIHandler {
    static tor = Tor();
    static authToken = '';

    static scheme = 'http';
    static host = 'yjqictkblqijcsldpwvkd2addy2kc7edpffeg64lhynruy3kxl7s5zid.onion';
    static port = 80;

    static me = null;

    static buildApiUrl(path, host = APIHandler.host) {
        const url = `${APIHandler.scheme}://${host}:${APIHandler.port}${path}`;
        console.log({ url });
        return url;
    }

    static setAuthInfo(user, tokenString) {
        APIHandler.me = user;
        APIHandler.authToken = tokenString;
    }

    constructor(endpoint) {
        if (env.get('AIAS_DEBUG') === 'true') {
            APIHandler.tor = new DirectAPI();
            APIHandler.host = env.get('AIAS_API_HOST')
            APIHandler.port = env.get('AIAS_API_PORT')
        }

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

    makeHeaders(headers) {
        return headers
            ? {
                ...this.headers,
                ...headers
            }
            : this.headers;
    }

    get(data = {}) {
        const headers = this.makeHeaders(data.headers);
        console.log(`GET ${this.endpoint}`);
        return APIHandler.tor.get(this.url, headers);
    }

    post(data = {}) {
        const body = data.body ? JSON.stringify(data.body) : '';
        const headers = this.makeHeaders(data.headers);
        console.log(`POST ${this.endpoint}`);
        return APIHandler.tor.post(this.url, body, headers);
    }

    delete(data = {}) {
        const body = data.body ? JSON.stringify(data.body) : '';
        const headers = this.makeHeaders(data.headers);
        console.log(`DELETE ${this.endpoint}`);
        return APIHandler.tor.delete(this.url, body, headers);
    }
}

export const useCurrentUser = () => {
    return APIHandler.me;
}