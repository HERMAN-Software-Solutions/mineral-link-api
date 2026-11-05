import { Router } from 'express';
import authRoutes from './auth.routes';
import listingRoutes from './listing.routes';
import mineralRoutes from './mineral.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/minerals', mineralRoutes);
router.use('/listings', listingRoutes);

export default router;