
import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m', // short-lived
  });
};

export const generateRefreshToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN || '7d', // long-lived
  });
};
