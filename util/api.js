import axios from 'axios';

const apiHost = '192.168.64.1:8080'

export const sendAPIRequest = (endpoint, data) => axios({
    ...data,
    url: 'http://' + apiHost + endpoint,
});