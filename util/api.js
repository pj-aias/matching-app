import axios from 'axios';
import Tor from 'react-native-tor';

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
        this.headers = {};
    }

    withAuth() {
        this.headers['Authorization'] = `Bearer ${authToken}`;
    }

    makeHeaders(headers) {
        return {
            ...this.headers,
            ...headers
        }
    }

    get(data) {
        const headers = this.makeHeaders(data.headers);
        return APIHandler.tor.get(this.url, headers);
    }

    post(data) {
        const body = JSON.stringify(data.body);
        const headers = this.makeHeaders(data.headers);
        return APIHandler.tor.post(this.url, body, headers);
    }

    delete(data) {
        const body = JSON.stringify(data.body);
        const headers = this.makeHeaders(data.headers);
        return APIHandler.tor.delete(this.url, body, headers);
    }
}

export const showAxiosError = (error) => {
    if (error.response) {
        console.log("** error response **")
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
    if (error.request) {
        console.log("** error request **")
        console.log(error.request);
    }

    console.log('** error message **');
    console.log(error.message);
    console.log('** error config **');
    console.log(error.config);
}