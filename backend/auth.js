import jwt from 'jsonwebtoken';
import config from './config/db';

export const requireAuth = req => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.slice(7) : null;
  const isAuthenticated = authHeader ? Boolean(jwt.verify(token, config.secret)) : false;
  if (!isAuthenticated) {
    throw new Error('User not authenticated.');
  }
}

export const requireAdmin = req => {
  throw new Error('User is not an admin.');
}
