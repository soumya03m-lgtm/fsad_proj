import { analyticsService } from './analytics.service.js';
import { asyncHandler } from '../../core/http/asyncHandler.js';
import { success } from '../../core/http/apiResponse.js';

export const analyticsController = {
  overview: asyncHandler(async (req, res) => {
    const data = await analyticsService.overview(req.user, req.query);
    success(res, data);
  }),

  formSummary: asyncHandler(async (req, res) => {
    const data = await analyticsService.formSummary(req.user, req.params.formId);
    success(res, data);
  }),

  trends: asyncHandler(async (req, res) => {
    const data = await analyticsService.trends(req.user, req.params.formId, req.query.from, req.query.to);
    success(res, data);
  }),

  exportCsv: asyncHandler(async (req, res) => {
    const csv = await analyticsService.exportCsv(req.user, req.params.formId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=form-${req.params.formId}-responses.csv`);
    res.status(200).send(csv);
  }),

  exportPdf: asyncHandler(async (req, res) => {
    const pdf = await analyticsService.exportPdf(req.user, req.params.formId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=form-${req.params.formId}-summary.pdf`);
    res.status(200).send(pdf);
  })
};
