import { Router } from 'express';

import { analyticsController } from './analytics.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.get('/', auth(Role.ADMIN), analyticsController.getAnalytics);

export const AnalyticsRoutes = router;
