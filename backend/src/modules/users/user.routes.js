import { Router } from 'express';
import { userController } from './user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';
import { ROLES } from '../../shared/enums/roles.js';

const router = Router();

router.use(authMiddleware);
router.get('/me', userController.me);
router.patch('/me', userController.updateMe);
router.get('/students', roleMiddleware(ROLES.ADMIN), userController.listStudents);

export default router;
