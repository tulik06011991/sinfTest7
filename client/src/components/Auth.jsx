import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Backend API URL

// Ro'yxatdan o'tish funksiyasi
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Server xatosi!" };
    }
};

// Kirish funksiyasi
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Server xatosi!" };
    }
};
