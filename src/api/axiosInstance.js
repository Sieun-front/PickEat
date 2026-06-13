import axios from 'axios';

const BASE_URL = 'https://pickeat-production-f582.up.railway.app';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshInstance = axios.create({
    baseURL: BASE_URL,
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
    async (error) => {
        const originalRequest = error.config;
        const isLoginRequest = originalRequest.url?.includes('/api/auth/login/');
        const isRegisterRequest = originalRequest.url?.includes('/api/auth/register/');

        if (isLoginRequest || isRegisterRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem('refresh');

            if (!refresh) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                localStorage.setItem('userMode', 'guest');

                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                window.location.href = '/login';

                return Promise.reject(error);
            }

            try {
                const response = await refreshInstance.post('/api/auth/token/refresh/', {
                    refresh,
                });

                const newAccess = response.data.access;

                localStorage.setItem('access', newAccess);

                originalRequest.headers.Authorization = `Bearer ${newAccess}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('user');
                localStorage.setItem('userMode', 'guest');

                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
