import apiClient from './apiClient';

export const authService = {
  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    return data.data;
  },
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    return data.data;
  },
  async refresh() {
    const { data } = await apiClient.post('/auth/refresh');
    return data.data;
  },
  async logout() {
    const { data } = await apiClient.post('/auth/logout');
    return data.data;
  },
  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data.data;
  }
};
