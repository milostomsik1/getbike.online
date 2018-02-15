import jwt from 'jsonwebtoken';

export const requireAuth = req => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.slice(7) : null;
  const isAuthenticated = authHeader ? Boolean(jwt.verify(token, process.env.SECRET_KEY)) : false;
  if (!isAuthenticated) {
    throw new Error('User not authenticated.');
  }
}

export const requireAdmin = req => {
  throw new Error('User is not an admin.');
}
