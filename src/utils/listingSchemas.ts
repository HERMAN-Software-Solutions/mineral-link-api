import { z } from 'zod';

export const createListingSchema = z.object({
  mineralId: z.uuid('mineralId must be a valid UUID'),
  quantity: z
    .number({ error: 'Quantity must be a number' })
    .positive('Quantity must be greater than 0')
    .max(999999999, 'Quantity is too large'),
  location: z
    .string()
    .trim()
    .min(2, 'Location must be at least 2 characters')
    .max(120, 'Location must be at most 120 characters'),
  notes: z.string().trim().max(1000, 'Notes must be at most 1000 characters').optional(),
});

export const updateListingSchema = z
  .object({
    quantity: z
      .number({ error: 'Quantity must be a number' })
      .positive('Quantity must be greater than 0')
      .max(999999999, 'Quantity is too large'),
    location: z
      .string()
      .trim()
      .min(2, 'Location must be at least 2 characters')
      .max(120, 'Location must be at most 120 characters'),
    notes: z.string().trim().max(1000, 'Notes must be at most 1000 characters'),
    status: z.enum(['active', 'sold'], { error: 'Status must be active or sold' }),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Send at least one field to update',
  });

export const listingParamsSchema = z.object({
  id: z.uuid('Listing id must be a valid UUID'),
});

export interface ListingQuery {
  mineralId?: string;
  region?: string;
}

export const listingQuerySchema = z.object({
  mineralId: z.uuid('mineralId must be a valid UUID').optional(),
  region: z.string().trim().min(1, 'region cannot be empty').max(80).optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;