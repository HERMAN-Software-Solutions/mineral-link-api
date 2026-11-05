import { Prisma } from '@prisma/client';
import { prisma } from './db';
import { AppError } from '../utils/AppError';
import { CreateListingInput, ListingQuery, UpdateListingInput } from '../utils/listingSchemas';

// Related data returned with every listing. The miner is limited to safe fields:
// no email and never the passwordHash.
const listingInclude = {
  mineral: { select: { id: true, name: true, unit: true } },
  miner: { select: { id: true, name: true, region: true } },
} satisfies Prisma.ListingInclude;

export async function createListing(minerId: string, input: CreateListingInput) {
  const mineral = await prisma.mineral.findUnique({ where: { id: input.mineralId } });
  if (!mineral) {
    throw new AppError(404, 'Mineral not found');
  }

  return prisma.listing.create({
    data: {
      minerId,
      mineralId: input.mineralId,
      quantity: input.quantity,
      location: input.location,
      notes: input.notes,
    },
    include: listingInclude,
  });
}

export async function listListings(query: ListingQuery) {
  const where: Prisma.ListingWhereInput = { status: 'active' };

  if (query.mineralId) {
    where.mineralId = query.mineralId;
  }
  if (query.region) {
    where.miner = { region: { equals: query.region, mode: 'insensitive' } };
  }

  return prisma.listing.findMany({
    where,
    include: listingInclude,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getListing(id: string) {
  const listing = await prisma.listing.findUnique({ where: { id }, include: listingInclude });
  if (!listing || listing.status === 'removed') {
    throw new AppError(404, 'Listing not found');
  }
  return listing;
}

// Loads a listing and makes sure the logged-in user owns it.
// The owner is decided by the database, never by anything in the request body.
async function getOwnedListing(id: string, userId: string) {
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing || listing.status === 'removed') {
    throw new AppError(404, 'Listing not found');
  }
  if (listing.minerId !== userId) {
    throw new AppError(403, 'You can only change your own listings');
  }
  return listing;
}

export async function updateListing(id: string, userId: string, input: UpdateListingInput) {
  await getOwnedListing(id, userId);
  return prisma.listing.update({ where: { id }, data: input, include: listingInclude });
}

export async function removeListing(id: string, userId: string) {
  await getOwnedListing(id, userId);
  await prisma.listing.update({ where: { id }, data: { status: 'removed' } });
}