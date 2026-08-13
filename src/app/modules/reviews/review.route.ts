import { Router } from 'express';

import { ReviewController } from './review.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/', ReviewController.createReview);

router.get(
  '/product/:productId',
  auth(Role.ADMIN),
  ReviewController.getProductReviews,
);

router.get('/:id', auth(Role.ADMIN), ReviewController.getSingleReview);

router.patch('/:id', auth(Role.ADMIN), ReviewController.updateReview);

router.delete('/:id', auth(Role.ADMIN), ReviewController.deleteReview);

export const ReviewRoutes = router;
