import Router from 'express';
import productRoutes from './product';
import categoryRoutes from './category';
import brandRoutes from "./manufacturer";
import imageRoutes from './image';
import backofficeRoutesOrder from './Order/Order';
import userRoutes from './user';
import authRouter from './auth';
import pruebaRoutes from './prueba/prueba';
import mercadoPagoRoutes from './mercadopago';


const router = Router();

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use("/manufacturer", brandRoutes);
router.use('/image', imageRoutes);
router.use('/user', userRoutes);
router.use('/backoffice/order', backofficeRoutesOrder);
router.use('/auth', authRouter)
router.use('/prueba', pruebaRoutes)
//router.use('/mercadopago', mercadoPagoRoutes)

export default router;
