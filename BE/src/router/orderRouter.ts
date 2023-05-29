// orderRouter.ts
import { Router } from 'express';
import orderController from '../controller/orderController';

export const orderRouter = Router();
orderRouter.get('/getOrder', orderController.getOrder);
orderRouter.get('/countCart/:idOrder', orderController.countCart);
orderRouter.post('/addCart', orderController.addCart);
orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.put('/editOrder/:id', orderController.editOrder);
orderRouter.get('/findByStatus/:idUser', orderController.findByStatus);
orderRouter.get('/findByIdUser/:idUser', orderController.findById);
orderRouter.get('/showCart/:idOrder', orderController.showCart);
orderRouter.delete('/deleteCart/:id', orderController.deleteCart);