import { Router } from 'express';
import {
  createListing,
  getListing,
  listListings,
  removeListing,
  updateListing,
} from '../controllers/listing.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', listListings);
router.get('/:id', getListing);
router.post('/', authenticate, authorize('miner'), createListing);
router.patch('/:id', authenticate, authorize('miner'), updateListing);
router.delete('/:id', authenticate, authorize('miner'), removeListing);

export default router;