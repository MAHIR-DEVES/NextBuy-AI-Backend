import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { ProductRoutes } from '../modules/products/product.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { CartRoute } from '../modules/cart/cart.route';
import { ChatbotRoutes } from '../modules/chatbot/chatbot.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';

const router = Router();

router.use('/users', UserRoute);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);
router.use('/cart', CartRoute);
router.use('/chatbot', ChatbotRoutes);
router.use('/wishlist', WishlistRoutes);

export default router;
