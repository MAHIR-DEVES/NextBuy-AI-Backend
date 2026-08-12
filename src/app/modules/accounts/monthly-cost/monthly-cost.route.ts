import { Router } from 'express';
import { MonthlyCostController } from './monthly-cost.controller';
import { auth } from '../../../middleware/auth';
import { Role } from '../../../../generated/prisma/enums';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.createMonthlyCost,
);

router.get(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.getAllMonthlyCosts,
);

router.get(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.getSingleMonthlyCost,
);

router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.updateMonthlyCost,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  MonthlyCostController.deleteMonthlyCost,
);

export const MonthlyCostRoutes = router;
