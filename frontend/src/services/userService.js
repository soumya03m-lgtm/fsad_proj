import apiClient from './apiClient';
import { demoData } from './demoData';

export const userService = {
  async listStudents() {
    try {
      const { data } = await apiClient.get('/users/students');
      return data.data;
    } catch {
      return demoData.listStudents();
    }
  },

  async me() {
    try {
      const { data } = await apiClient.get('/users/me');
      return data.data;
    } catch {
      return demoData.me();
    }
  },

  async updateMe(payload) {
    try {
      const { data } = await apiClient.patch('/users/me', payload);
      return data.data;
    } catch {
      return demoData.updateMe(payload);
    }
  }
};
