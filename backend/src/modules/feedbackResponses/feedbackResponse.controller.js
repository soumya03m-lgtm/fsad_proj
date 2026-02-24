import { feedbackResponseService } from './feedbackResponse.service.js';

export const feedbackResponseController = {
  async submit(req, res, next) {
    try {
      const data = await feedbackResponseService.submit(req.user, req.params.formId, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async listForForm(req, res, next) {
    try {
      const data = await feedbackResponseService.listForForm(req.user, req.params.formId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async myStatuses(req, res, next) {
    try {
      const data = await feedbackResponseService.myStatuses(req.user);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async insightsForStudent(req, res, next) {
    try {
      const data = await feedbackResponseService.insightsForStudent(req.user, req.params.formId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
};
