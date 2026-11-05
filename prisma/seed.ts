import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma } from '../src/services/db';

const minerals = [
  { name: 'Gold', unit: 'gram' },
  { name: 'Tin', unit: 'kg' },
  { name: 'Tungsten', unit: 'kg' },
];

async function main() {
  for (const mineral of minerals) {
    await prisma.mineral.upsert({
      where: { name: mineral.name },
      update: {},
      create: mineral,
    });
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env before seeding');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      isVerified: true,
    },
  });

  console.log('Seed finished: Gold, Tin, Tungsten and the admin user are ready.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());