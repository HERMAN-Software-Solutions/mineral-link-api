import { z } from 'zod';

// One consistent form for mineral names: "  gOLD " -> "Gold", "rare   earth" -> "Rare Earth"
export function normalizeMineralName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const createMineralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .transform(normalizeMineralName),
  unit: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Unit is required')
    .max(20, 'Unit must be at most 20 characters'),
});

export type CreateMineralInput = z.infer<typeof createMineralSchema>;