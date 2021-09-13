import axios from 'axios';
import Tor from 'react-native-tor';

const apiScheme = 'http';
const apiHost = '192.168.64.1';
const apiPort = 80;

const tor = Tor();

let authToken = '';

const buildApiUrl = (path, host) => `${apiScheme}://${host || apiHost}:${apiPort}${path}`;
const addAuthorizationHeader = (data) => ({
    ...data,
    headers: {
        ...data.headers,
        "Authorization": `Bearer ${authToken}`
    }
});

export const sendRequest = (method, url, headers, body) => {
    switch (method) {
        case 'GET':
            tor.get(url, headers);
            break;
        case 'POST':
            tor.post(url, body, headers);
            break;
        case 'DELETE':
            tor.patch(url, body, headers);
            break;
    }
}

export const sendAPIRequest = (endpoint, data) => axios({
    ...data,
    url: buildApiUrl(endpoint)
});

export const sendAPIRequestAuth = (endpoint, data) => sendAPIRequest(endpoint, addAuthorizationHeader(data));

export const setAuthToken = (tokenString) => {
    authToken = tokenString;
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

export const setupTor = () => {
    console.log("connecting tor...");
    tor.startIfNotStarted().then((p) => {
        console.log(`running tor on port :${p}`);
    }).catch((err) => {
        console.error(err);
    });
}