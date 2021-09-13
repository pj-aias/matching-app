import axios from 'axios';

const apiScheme = 'http';
const apiHost = '192.168.64.1';
const apiPort = 8080;
let authToken = '';

const buildApiUrl = (path) => `${apiScheme}://${apiHost}:${apiPort}${path}`;
const addAuthorizationHeader = (data) => ({
    ...data,
    headers: {
        ...data.headers,
        "Authorization": `Bearer ${authToken}`
    }
});

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