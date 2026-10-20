import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthUser } from '../types/auth';
import { AppError } from './AppError';

export function signToken(user: AuthUser): string {
  return jwt.sign({ email: user.email, role: user.role }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
}

export function verifyToken(token: string): AuthUser {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === 'string' || !decoded.sub) {
      throw new Error('Unexpected token payload');
    }
    return { id: decoded.sub, email: decoded.email, role: decoded.role };
  } catch {
    throw new AppError(401, 'Invalid or expired token');
  }
}