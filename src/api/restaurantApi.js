import axiosInstance from './axiosInstance';

export const getKeywords = async () => {
    const response = await axiosInstance.get('/api/restaurants/keywords/');
    return response.data;
};
export const getRecommendations = async (payload) => {
    const response = await axiosInstance.post('/api/restaurants/recommend/', payload);
    return response.data;
};

export const getMyPicks = async () => {
    const response = await axiosInstance.get('/api/restaurants/my-picks/');
    return response.data;
};
export const saveRestaurant = async (naverId) => {
    const response = await axiosInstance.post(`/api/restaurants/${naverId}/save/`);
    return response.data;
};

export const unsaveRestaurant = async (naverId) => {
    const response = await axiosInstance.delete(`/api/restaurants/${naverId}/save/`);
    return response.data;
};
