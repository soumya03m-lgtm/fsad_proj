import apiClient from './apiClient';
import { demoData } from './demoData';

export const responseService = {
  async submit(formId, payload) {
    try {
      const { data } = await apiClient.post(`/responses/forms/${formId}`, payload);
      return data.data;
    } catch {
      return demoData.submitResponse(formId, payload);
    }
  },
  async myStatuses() {
    try {
      const { data } = await apiClient.get('/responses/me');
      return data.data;
    } catch {
      return demoData.myStatuses();
    }
  },
  async insights(formId) {
    try {
      const { data } = await apiClient.get(`/responses/forms/${formId}/insights`);
      return data.data;
    } catch {
      return demoData.insights(formId);
    }
  },
  async listForForm(formId) {
    try {
      const { data } = await apiClient.get(`/responses/forms/${formId}`);
      return data.data;
    } catch {
      return demoData.listResponsesForForm(formId);
    }
  }
};
