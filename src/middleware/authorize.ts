import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/auth';
import { AppError } from '../utils/AppError';

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, 'Authentication required'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, 'You do not have permission to do this'));
    }
    next();
  };
}