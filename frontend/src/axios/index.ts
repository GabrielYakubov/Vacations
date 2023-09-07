import axios from 'axios';
import { BASE_API_URL } from '../config';

const axiosCustomInstance = axios.create({
    baseURL: BASE_API_URL
});


// Intercept on response
axiosCustomInstance.interceptors.request.use(
    res => {
        return res;
    },
    err => {
        return Promise.reject(err);
    },
);



axiosCustomInstance.interceptors.response.use(
    res => {
        //
        return res;
    },
    err => {
        // Error handling logic
        if (err.response.status === 401) {
            console.log(err.response.message)
        }

        return Promise.reject(err);
    },
);



export default axiosCustomInstance;