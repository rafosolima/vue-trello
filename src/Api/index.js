import axios from 'axios';

export default axios.create({
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    baseURL: 'http://127.0.0.1/Api/public/api'
});