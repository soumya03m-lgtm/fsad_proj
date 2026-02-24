import { User } from './user.model.js';

export const userService = {
  async listStudents() {
    return User.find({ role: 'STUDENT' }).select('name email role').sort({ createdAt: -1 });
  },

  async getProfile(userId) {
    const user = await User.findById(userId).select('name email role departmentId isActive lastLoginAt createdAt updatedAt');
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      err.code = 'USER_NOT_FOUND';
      throw err;
    }
    return user;
  },

  async updateProfile(userId, payload) {
    const allowed = {
      name: payload.name,
      departmentId: payload.departmentId
    };

    const profile = await User.findByIdAndUpdate(userId, allowed, {
      new: true,
      runValidators: true
    }).select('name email role departmentId isActive lastLoginAt createdAt updatedAt');

    if (!profile) {
      const err = new Error('User not found');
      err.status = 404;
      err.code = 'USER_NOT_FOUND';
      throw err;
    }

    return profile;
  }
};
