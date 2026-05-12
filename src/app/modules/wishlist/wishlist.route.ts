import express from 'express';
import { WishlistController } from './wishlist.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = express.Router();

/**
 * All routes require auth
 */
router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.createWishlist,
);

router.get(
  '/',
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.getWishlistByUser,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  WishlistController.deleteWishlistItem,
);

export const WishlistRoutes = router;
