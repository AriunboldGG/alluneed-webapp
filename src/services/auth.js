import apiService from './api';
import { saveAuthData, logout } from '@/lib/auth';

export class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      saveAuthData(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(credentials) {
    try {
      const response = await apiService.post('/auth/register', credentials);
      saveAuthData(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      // Even if the API call fails, we should still clear local storage
      console.error('Logout API call failed:', error);
    } finally {
      logout();
    }
  }

  async getCurrentUser() {
    const response = await apiService.get('/auth/me');
    return response;
  }

  async refreshToken() {
    const response = await apiService.post('/auth/refresh');
    saveAuthData(response);
    return response;
  }

  async updateProfile(userData) {
    const response = await apiService.put('/auth/profile', userData);
    return response;
  }

  async changePassword(passwords) {
    await apiService.post('/auth/change-password', passwords);
  }
}

export const authService = new AuthService();
export default authService; 