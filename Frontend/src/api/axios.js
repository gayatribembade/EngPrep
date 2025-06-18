import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.log('Unauthorized access');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 