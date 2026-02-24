import authRoutes from '../../modules/auth/auth.routes.js';
import courseRoutes from '../../modules/courses/course.routes.js';
import feedbackFormRoutes from '../../modules/feedbackForms/feedbackForm.routes.js';
import feedbackResponseRoutes from '../../modules/feedbackResponses/feedbackResponse.routes.js';
import analyticsRoutes from '../../modules/analytics/analytics.routes.js';
import userRoutes from '../../modules/users/user.routes.js';
import { success } from '../http/apiResponse.js';

export function registerRoutes(app) {
  app.get('/health', (_req, res) => {
    success(res, { status: 'ok' });
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/courses', courseRoutes);
  app.use('/api/v1/forms', feedbackFormRoutes);
  app.use('/api/v1/responses', feedbackResponseRoutes);
  app.use('/api/v1/analytics', analyticsRoutes);
  app.use('/api/v1/users', userRoutes);
}
