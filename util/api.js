import axios from 'axios';

const apiHost = '192.168.64.1:8080'
let authToken = '';

export const sendAPIRequest = (endpoint, data) => axios({
    ...data,
    url: 'http://' + apiHost + endpoint,
});

export const sendAPIRequestAuth = (endpoint, data) => axios({
    ...data,
    url: 'http://' + apiHost + endpoint,
    headers: {
        ...data.headers,
        "Authorizations": `Bearer ${authToken}`
    }
});

export const setAuthToken = (tokenString) => {
    authToken = tokenString;
}