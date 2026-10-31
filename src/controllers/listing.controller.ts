import { Request, Response } from 'express';
import * as listingService from '../services/listing.service';
import {
  createListingSchema,
  listingParamsSchema,
  listingQuerySchema,
  updateListingSchema,
} from '../utils/listingSchemas';
import { AppError } from '../utils/AppError';

export async function createListing(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, 'Authentication required');
  }
  const input = createListingSchema.parse(req.body);
  // The miner is always the logged-in user. It is never read from the request body.
  const listing = await listingService.createListing(req.user.id, input);
  res.status(201).json({ listing });
}

export async function listListings(req: Request, res: Response) {
  const query = listingQuerySchema.parse(req.query);
  const listings = await listingService.listListings(query);
  res.status(200).json({ listings });
}

export async function getListing(req: Request, res: Response) {
  const { id } = listingParamsSchema.parse(req.params);
  const listing = await listingService.getListing(id);
  res.status(200).json({ listing });
}

export async function updateListing(req: Request, res: Response) {
  const { id } = listingParamsSchema.parse(req.params);
  const input = updateListingSchema.parse(req.body);
  const listing = await listingService.updateListing(id, input);
  res.status(200).json({ listing });
}

export async function removeListing(req: Request, res: Response) {
  const { id } = listingParamsSchema.parse(req.params);
  await listingService.removeListing(id);
  res.status(204).send();
}