import axios from 'axios'
import { getToken, removeToken, setToken } from './authentication'

const http = axios.create({
    baseURL: 'http://localhost:8080/api/v2/',
    // Thêm cấu hình CORS vào đây
    withCredentials: true, // Cho phép gửi cookie và headers qua các nguồn khác nhau
})

http.interceptors.request.use((request) => {
    if (getToken()) {
        request.headers.Authorization = `Bearer ${getToken()}`
    } else {
        // Trong trường hợp đăng nhập, bạn có thể bỏ header Authorization
        if (request.url !== 'auth/login') {
            request.headers.Authorization = null;
        }
    }
    return request
})

http.interceptors.response.use(
    (response) => {
        
        if (
            response.config.url === 'auth/login' &&
            response?.data?.codeStatus === 200
        ) {
            setToken(response?.data.data.id_refresh_token);
        }

        return response;
    },
    (error) => {
        if (error?.response && error?.response?.status === 401) {
            removeToken();
            window.location.href = '/login';
        }
    }
);

export default http
