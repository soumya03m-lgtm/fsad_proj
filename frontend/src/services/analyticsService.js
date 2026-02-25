import apiClient from './apiClient';
import { demoData } from './demoData';

export const analyticsService = {
  async overview(params = {}) {
    try {
      const { data } = await apiClient.get('/analytics/overview', { params });
      return data.data;
    } catch {
      return demoData.overview(params);
    }
  },
  async summary(formId) {
    try {
      const { data } = await apiClient.get(`/analytics/forms/${formId}/summary`);
      return data.data;
    } catch {
      return demoData.summary(formId);
    }
  }
};
