import { Request, Response } from 'express';
import * as mineralService from '../services/mineral.service';
import { createMineralSchema } from '../utils/mineralSchemas';

export async function createMineral(req: Request, res: Response) {
  const input = createMineralSchema.parse(req.body);
  const mineral = await mineralService.createMineral(input);
  res.status(201).json({ mineral });
}

export async function listMinerals(_req: Request, res: Response) {
  const minerals = await mineralService.listMinerals();
  res.status(200).json({ minerals });
}