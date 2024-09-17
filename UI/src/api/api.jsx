import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api';

export const uploadVideo = async (formData) => {
    return axios.post(`${API_URL}/videos/upload`, formData);
};

export const reviewVideo = async (id, reviewData) => {
    return axios.post(`${API_URL}/videos/review/${id}`, reviewData);
};

export const approveVideo = async (id) => {
    return axios.post(`${API_URL}/videos/approve/${id}`);
};
