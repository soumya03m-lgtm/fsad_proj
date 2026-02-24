import { feedbackFormService } from './feedbackForm.service.js';

export const feedbackFormController = {
  async create(req, res, next) {
    try {
      const data = await feedbackFormService.create(req.user, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const data = await feedbackFormService.list(req.user);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const data = await feedbackFormService.getById(req.user, req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await feedbackFormService.update(req.user, req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async publish(req, res, next) {
    try {
      const data = await feedbackFormService.publish(req.user, req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async close(req, res, next) {
    try {
      const data = await feedbackFormService.close(req.user, req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};
