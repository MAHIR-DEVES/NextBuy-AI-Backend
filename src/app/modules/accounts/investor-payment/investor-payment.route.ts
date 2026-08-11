import { Router } from 'express';

import { investorPaymentController } from './investor-payment.controller';
import { Role } from '../../../../generated/prisma/enums';
import { auth } from '../../../middleware/auth';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.createInvestorPayment,
);

router.get(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.getAllInvestorPayments,
);

router.get(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.getSingleInvestorPayment,
);

router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.updateInvestorPayment,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  investorPaymentController.deleteInvestorPayment,
);

export const InvestorPaymentRoutes = router;
