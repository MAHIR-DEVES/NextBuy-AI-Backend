import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = Router();

router.use('/users', UserRoute);
router.use('/products', ProductRoutes);

export default router;
