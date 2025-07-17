import axios from 'axios';
import { getToken, logout } from '@/lib/auth';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  async get(url, config) {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post(url, data, config) {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put(url, data, config) {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async delete(url, config) {
    const response = await this.api.delete(url, config);
    return response.data;
  }

  async patch(url, data, config) {
    const response = await this.api.patch(url, data, config);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 