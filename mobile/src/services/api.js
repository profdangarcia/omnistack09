import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.10.121:3333',
});

export default api;