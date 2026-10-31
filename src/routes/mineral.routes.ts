import { Router } from 'express';
import { createMineral, listMinerals } from '../controllers/mineral.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', listMinerals);
router.post('/', authenticate, authorize('admin'), createMineral);

export default router;