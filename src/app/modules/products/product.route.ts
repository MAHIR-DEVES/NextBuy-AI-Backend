// product.route.ts
import { Router } from 'express';
import { ProductController } from './product.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  ProductController.createProduct,
);
router.get('/', ProductController.getAllProducts);
router.get('/:slug', ProductController.getSingleProduct);
router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  ProductController.updateProduct,
);
router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
