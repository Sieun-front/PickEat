import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pickeat-production-f582.up.railway.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const access = localStorage.getItem('access');

    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            localStorage.removeItem('userMode');

            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');

            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
