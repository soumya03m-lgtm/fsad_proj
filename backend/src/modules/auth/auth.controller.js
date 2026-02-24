import { authService } from './auth.service.js';
import { env } from '../../config/env.js';

const refreshCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.nodeEnv === 'production',
  path: '/api/v1/auth'
};

export const authController = {
  async register(req, res, next) {
    try {
      const data = await authService.register(req.body);
      res.cookie('refreshToken', data.refreshToken, refreshCookieOptions);
      res.status(201).json({ success: true, data: { token: data.accessToken, user: data.user } });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const data = await authService.login(req.body);
      res.cookie('refreshToken', data.refreshToken, refreshCookieOptions);
      res.json({ success: true, data: { token: data.accessToken, user: data.user } });
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      const data = await authService.me(req.user.sub);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req, res, next) {
    try {
      const data = await authService.refresh(req.cookies.refreshToken);
      res.json({ success: true, data: { token: data.accessToken, user: data.user } });
    } catch (error) {
      next(error);
    }
  },

  async logout(_req, res) {
    res.clearCookie('refreshToken', refreshCookieOptions);
    res.json({ success: true, data: { loggedOut: true } });
  }
};
