import { Router } from 'express';

import { wholesaleController } from './wholesale.controller';
import { auth } from '../../../middleware/auth';
import { Role } from '../../../../generated/prisma/enums';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.createWholesale,
);

router.get(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.getAllWholesales,
);

router.get(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.getSingleWholesale,
);

router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.updateWholesale,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  wholesaleController.deleteWholesale,
);

export const WholesaleRoutes = router;
