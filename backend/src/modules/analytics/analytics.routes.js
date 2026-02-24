import { Router } from 'express';
import { analyticsController } from './analytics.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';
import { ROLES } from '../../shared/enums/roles.js';

const router = Router();

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN));

router.get('/overview', analyticsController.overview);
router.get('/forms/:formId/summary', analyticsController.formSummary);
router.get('/forms/:formId/trends', analyticsController.trends);
router.get('/forms/:formId/export.csv', analyticsController.exportCsv);
router.get('/forms/:formId/export.pdf', analyticsController.exportPdf);

export default router;
