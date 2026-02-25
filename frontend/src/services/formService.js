import apiClient from './apiClient';
import { demoData } from './demoData';

export const formService = {
  async list() {
    try {
      const { data } = await apiClient.get('/forms');
      return Array.isArray(data.data) ? data.data : demoData.listForms();
    } catch {
      return demoData.listForms();
    }
  },
  async create(payload) {
    try {
      const { data } = await apiClient.post('/forms', payload);
      return data.data;
    } catch {
      return demoData.createForm(payload);
    }
  },
  async publish(formId) {
    try {
      const { data } = await apiClient.post(`/forms/${formId}/publish`);
      return data.data;
    } catch {
      return demoData.publishForm(formId);
    }
  },
  async close(formId) {
    try {
      const { data } = await apiClient.post(`/forms/${formId}/close`);
      return data.data;
    } catch {
      return demoData.closeForm(formId);
    }
  },
  async getById(formId) {
    try {
      const { data } = await apiClient.get(`/forms/${formId}`);
      return data.data;
    } catch {
      return demoData.getFormById(formId);
    }
  }
};
