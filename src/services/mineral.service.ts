import { Prisma } from '@prisma/client';
import { prisma } from './db';
import { AppError } from '../utils/AppError';
import { CreateMineralInput } from '../utils/mineralSchemas';

export async function createMineral(input: CreateMineralInput) {
  try {
    return await prisma.mineral.create({
      data: { name: input.name, unit: input.unit },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError(409, 'A mineral with this name already exists');
    }
    throw error;
  }
}

export async function listMinerals() {
  return prisma.mineral.findMany({ orderBy: { name: 'asc' } });
}