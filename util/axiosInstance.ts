import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    timeout: 5000,
  });

export default apiClient;