import { Router } from 'express';
import { feedbackResponseController } from './feedbackResponse.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';
import { ROLES } from '../../shared/enums/roles.js';
import { validate } from '../../middleware/validate.middleware.js';
import { submitFeedbackResponseSchema } from './feedbackResponse.validation.js';

const router = Router();

router.use(authMiddleware);

router.post('/forms/:formId', roleMiddleware(ROLES.STUDENT), validate(submitFeedbackResponseSchema), feedbackResponseController.submit);
router.get('/forms/:formId', roleMiddleware(ROLES.ADMIN), feedbackResponseController.listForForm);
router.get('/forms/:formId/insights', roleMiddleware(ROLES.STUDENT), feedbackResponseController.insightsForStudent);
router.get('/me', roleMiddleware(ROLES.STUDENT), feedbackResponseController.myStatuses);

export default router;
