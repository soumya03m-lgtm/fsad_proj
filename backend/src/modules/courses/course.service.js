import { Course } from './course.model.js';

export const courseService = {
  async list(user) {
    if (user.role === 'ADMIN') {
      return Course.find({ adminId: user.sub }).sort({ createdAt: -1 });
    }
    return Course.find({ assignedStudentIds: user.sub }).sort({ createdAt: -1 });
  },

  async create(user, payload) {
    return Course.create({ ...payload, adminId: user.sub });
  },

  async update(user, id, payload) {
    const course = await Course.findOneAndUpdate({ _id: id, adminId: user.sub }, payload, { new: true });
    if (!course) {
      const err = new Error('Course not found');
      err.status = 404;
      err.code = 'COURSE_NOT_FOUND';
      throw err;
    }
    return course;
  },

  async remove(user, id) {
    const deleted = await Course.findOneAndDelete({ _id: id, adminId: user.sub });
    if (!deleted) {
      const err = new Error('Course not found');
      err.status = 404;
      err.code = 'COURSE_NOT_FOUND';
      throw err;
    }
    return { deleted: true };
  },

  async assignStudents(user, id, studentIds) {
    const uniqueStudentIds = [...new Set((studentIds || []).map(String))];
    const course = await Course.findOneAndUpdate(
      { _id: id, adminId: user.sub },
      { $set: { assignedStudentIds: uniqueStudentIds } },
      { new: true }
    );

    if (!course) {
      const err = new Error('Course not found');
      err.status = 404;
      err.code = 'COURSE_NOT_FOUND';
      throw err;
    }

    return course;
  }
};
