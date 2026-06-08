import axiosInstance from './axiosInstance';

export const register = async ({ username, nickname, password }) => {
    const response = await axiosInstance.post('/api/auth/register/', {
        username,
        nickname,
        password,
    });

    return response.data;
};

export const login = async ({ username, password }) => {
    const response = await axiosInstance.post('/api/auth/login/', {
        username,
        password,
    });

    return response.data;
};
