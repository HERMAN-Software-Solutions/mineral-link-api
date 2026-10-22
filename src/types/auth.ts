export type UserRole = 'miner' | 'buyer' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}