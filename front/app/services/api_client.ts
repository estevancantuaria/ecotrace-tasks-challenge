import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export const apiClient = {
    async get<T = any>(url: string, config?: any): Promise<T> {
        const response = await client.get(url, config);
        return response.data;
    },

    async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await client.post(url, data, config);
        return response.data;
    },

    async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await client.put(url, data, config);
        return response.data;
    },

    async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await client.patch(url, data, config);
        return response.data;
    },

    async delete<T = any>(url: string, config?: any): Promise<T> {
        const response = await client.delete(url, config);
        return response.data;
    },
};