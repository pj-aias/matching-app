import axios from 'axios';

const apiScheme = 'http;//';
const apiHost = '203.178.139.171';
const apiPort = 8080;
let authToken = '';

const generateApiUrl = (scheme, host, port, path) => `${apiScheme}://${apiHost}:${apiPort}${path}`;

export const sendAPIRequest = (endpoint, data) => axios({
    ...data,
    url: generateApiUrl(apiScheme, apiHost, apiPort, endpoint)
});

export const sendAPIRequestAuth = (endpoint, data) => {
    let authData = {
        ...data
    };
    authData.headers['Authorization'] = `Bearer ${authToken}`;

    return sendAPIRequest(endpoint, authData);
}

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