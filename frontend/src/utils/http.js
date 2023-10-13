import axios from 'axios';
import { getToken, setToken, setUser, removeItem } from './authentication';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/v2/',
    // Thêm cấu hình CORS vào đây
    withCredentials: true, // Cho phép gửi cookie và headers qua các nguồn khác nhau
    headers: {
        'Content-Type': 'application/json', // Đặt kiểu dữ liệu của yêu cầu là JSON
    },
});

http.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`;
    } else {
        // Trong trường hợp đăng nhập, bạn có thể bỏ header Authorization
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
        if (
            response.config.url === 'auth/login' &&
            response?.data?.codeStatus === 200
        ) {
            setToken(response?.data.data.token);
            setUser(response?.data.data.user);
        }
        if (response?.data?.status === 401) {
            console.log(response)
            removeItem();
            window.location.href = "/";
        }

        return response;
    } 
);

export default http;
