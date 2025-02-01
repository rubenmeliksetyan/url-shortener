import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in .env

export const createShortUrl = async (originalUrl: string, userId: number) => {
    const response = await axios.post(`${API_BASE_URL}/urls`, { originalUrl, userId });
    return response.data;
};

export const updateShortUrl = async (id: number, shortenedUrl: string) => {
    const response = await axios.put(`${API_BASE_URL}/urls/${id}`, { shortenedUrl });
    return response.data;
};

export const getOriginalUrl = async (slug: string) => {
    const response = await axios.get(`${API_BASE_URL}/urls/resolve/${slug}`);
    return response.data;
};