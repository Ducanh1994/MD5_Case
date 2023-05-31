import {Router} from "express";
import productRouter from "./productRouter";
import {userRouter} from "./userRouter";
import adminRouter from "./adminRouter";
import orderDetailRouter from "./orderDetailRouter";
import categoryRouter from "./categoryRouter";

const router = Router();
router.use('/admin', adminRouter)
router.use('/products', productRouter);
router.use('/category',categoryRouter);
router.use('/auth', userRouter);
router.use('/order-detail', orderDetailRouter);
export default router;
