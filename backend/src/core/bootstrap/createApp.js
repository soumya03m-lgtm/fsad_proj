import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import { env } from '../../config/env.js';
import { registerRoutes } from './registerRoutes.js';
import { notFoundMiddleware } from '../http/notFound.js';
import { errorMiddleware } from '../../middleware/error.middleware.js';

const privateNetworkOriginPattern =
  /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

export function createApp() {
  const app = express();
  const allowedOrigins = new Set(env.clientUrls);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        if (privateNetworkOriginPattern.test(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(morgan('dev'));

  registerRoutes(app);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
