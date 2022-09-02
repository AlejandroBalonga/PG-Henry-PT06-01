import Router from 'express';
import productRoutes from './product';
import categoryRoutes from './category';
import imageRoutes from './image';
//import backofficeRoutesRol from './Rol';
import backofficeRoutesOrder from './Order/Order';
import userRoutes from './user';
import login from "./login/index";

const router = Router();

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/image', imageRoutes);
router.use('/user', userRoutes);
//router.use('/backoffice/rol', backofficeRoutesRol);
router.use('/backoffice/order', backofficeRoutesOrder);
router.use("/login", login);

export default router;
