import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/student-feedback',
  jwtSecret: process.env.JWT_SECRET || 'development_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET || 'development_refresh_secret',
  refreshJwtExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN || '7d',
  adminLoginEmail: (process.env.ADMIN_LOGIN_EMAIL || 'soumya.mishra.7812@gmail.com').toLowerCase(),
  adminLoginPassword: process.env.ADMIN_LOGIN_PASSWORD || '321123',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  clientUrls: (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
};
