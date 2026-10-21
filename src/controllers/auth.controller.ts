import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { loginSchema, registerSchema } from '../utils/authSchemas';
import { AppError } from '../utils/AppError';

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const result = await authService.register(input);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const result = await authService.login(input);
  res.status(200).json(result);
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, 'Authentication required');
  }
  const user = await authService.getProfile(req.user.id);
  res.status(200).json({ user });
}