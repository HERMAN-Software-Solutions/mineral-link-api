import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { prisma } from './db';
import { AppError } from '../utils/AppError';
import { signToken } from '../utils/jwt';
import { LoginInput, RegisterInput } from '../utils/authSchemas';

const SALT_ROUNDS = 10;

// The only user fields we ever send back. passwordHash is deliberately missing.
const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  phoneNumber: true,
  region: true,
  isVerified: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export async function register(input: RegisterInput) {
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  let user;
  try {
    user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role,
      },
      select: publicUserSelect,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError(409, 'An account with this email already exists');
    }
    throw error;
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const passwordMatches = user ? await bcrypt.compare(input.password, user.passwordHash) : false;

  if (!user || !passwordMatches) {
    throw new AppError(401, 'Invalid email or password');
  }

  const { passwordHash: _passwordHash, ...publicUser } = user;
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user: publicUser, token };
}

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: publicUserSelect,
  });

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
}