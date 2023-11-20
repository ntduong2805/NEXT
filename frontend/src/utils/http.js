import axios from 'axios';
import { getToken, setToken, setUser, removeItem } from './authentication';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì Navigate

const http = axios.create({
    baseURL: 'http://localhost:8080/api/v2/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`;
    } else {
        if (config.url !== 'auth/login') {
            config.headers.Authorization = null;
        }
    }
    if (config.method === 'options') {
        return Promise.reject('OPTIONS request');
    }
    return config;
});

http.interceptors.response.use(
    (response) => {
        if (response.config.url === 'auth/login' && response?.data?.codeStatus === 200) {
            setToken(response?.data.data.token);
            setUser(response?.data.data.user);
        }
        if (response?.status === 401) {
            removeItem();
            const navigate = useNavigate();
            navigate("/");
        }
        return response;
    }
);

export default http;
