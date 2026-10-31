import { Router } from 'express';
import authRoutes from './auth.routes';
import mineralRoutes from './mineral.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/minerals', mineralRoutes);

export default router;