import { courseService } from './course.service.js';

export const courseController = {
  async list(req, res, next) {
    try {
      const data = await courseService.list(req.user);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const data = await courseService.create(req.user, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await courseService.update(req.user, req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await courseService.remove(req.user, req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async assignStudents(req, res, next) {
    try {
      const data = await courseService.assignStudents(req.user, req.params.id, req.body.studentIds || []);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};
