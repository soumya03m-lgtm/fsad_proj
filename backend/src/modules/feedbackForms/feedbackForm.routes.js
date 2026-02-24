import { Router } from 'express';
import { feedbackFormController } from './feedbackForm.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';
import { ROLES } from '../../shared/enums/roles.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createFeedbackFormSchema, updateFeedbackFormSchema } from './feedbackForm.validation.js';

const router = Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(ROLES.ADMIN), validate(createFeedbackFormSchema), feedbackFormController.create);
router.get('/', feedbackFormController.list);
router.get('/:id', feedbackFormController.getById);
router.patch('/:id', roleMiddleware(ROLES.ADMIN), validate(updateFeedbackFormSchema), feedbackFormController.update);
router.post('/:id/publish', roleMiddleware(ROLES.ADMIN), feedbackFormController.publish);
router.post('/:id/close', roleMiddleware(ROLES.ADMIN), feedbackFormController.close);

export default router;
