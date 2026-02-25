import apiClient from './apiClient';
import { demoData } from './demoData';

export const courseService = {
  async list() {
    try {
      const { data } = await apiClient.get('/courses');
      return Array.isArray(data.data) ? data.data : demoData.listCourses();
    } catch {
      return demoData.listCourses();
    }
  },

  async create(payload) {
    try {
      const { data } = await apiClient.post('/courses', payload);
      return data.data;
    } catch {
      return demoData.createCourse(payload);
    }
  },

  async assignStudents(courseId, studentIds) {
    try {
      const { data } = await apiClient.post(`/courses/${courseId}/assign-students`, { studentIds });
      return data.data;
    } catch {
      return demoData.assignStudents(courseId, studentIds);
    }
  }
};
