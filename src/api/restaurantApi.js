import axiosInstance from './axiosInstance';

export const getKeywords = async () => {
    const response = await axiosInstance.get('/api/restaurants/keywords/');
    return response.data;
};

export const getRecommendations = async ({ foodType, mood, distance, diningType }) => {
    const response = await axiosInstance.post('/api/restaurants/recommend/', {
        food_types: [foodType],
        moods: [mood],
        distance,
        meal_situation: diningType,
    });

    return response.data;
};
