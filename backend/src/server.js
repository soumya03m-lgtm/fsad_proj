import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './shared/utils/logger.js';

async function bootstrap() {
  try {
    await connectDB();
    app.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error('Server boot failed', error);
    process.exit(1);
  }
}

bootstrap();
