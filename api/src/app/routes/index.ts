import Router from 'express';
import productRoutes from './product';
import categoryRoutes from './category';
import imageRoutes from './image';
import backofficeRoutesOrder from './Order/Order';
import userRoutes from './user';
import authRouter from './auth';
import pruebaRoutes from './prueba/prueba';
import mercadoPagoRoutes from './mercadopago';
import accountRoutes from './mails/confirmaccount';



import backofficeRoutesUser from "./backoffice/User";
import backofficeRoutesCategory from "./backoffice/Category";
import backofficeRoutesProduct from "./backoffice/Product";
import backofficeRoutesOrders from "./backoffice/Orders";
import reviewsRouter from './reviews';


const router = Router();

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/image', imageRoutes);
router.use('/user', userRoutes);
router.use('/backoffice/order', backofficeRoutesOrder);
router.use('/auth', authRouter)
router.use('/prueba', pruebaRoutes)
router.use('/mercadopago', mercadoPagoRoutes)
router.use('/mail', accountRoutes)
router.use('/review', reviewsRouter)

router.use("/backoffice/user", backofficeRoutesUser);
router.use("/backoffice/category", backofficeRoutesCategory);
router.use("/backoffice/product", backofficeRoutesProduct);
router.use("/backoffice/orders", backofficeRoutesOrders);

export default router;
