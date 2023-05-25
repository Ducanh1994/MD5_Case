import {Router} from "express";
import {productRouter} from "./product-router";
import {userRouter} from "./user-router";
import {orderRouter} from "./order-router";



export const router = Router();
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
