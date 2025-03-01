import axios from './index';

//set auth Bearer to browser
export const setAuthHeader = (token: string) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

