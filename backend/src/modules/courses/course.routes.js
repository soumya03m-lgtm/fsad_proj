import { Router } from 'express';
import { courseController } from './course.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';
import { ROLES } from '../../shared/enums/roles.js';

const router = Router();

router.use(authMiddleware);

router.get('/', courseController.list);
router.post('/', roleMiddleware(ROLES.ADMIN), courseController.create);
router.patch('/:id', roleMiddleware(ROLES.ADMIN), courseController.update);
router.delete('/:id', roleMiddleware(ROLES.ADMIN), courseController.remove);
router.post('/:id/assign-students', roleMiddleware(ROLES.ADMIN), courseController.assignStudents);

export default router;
