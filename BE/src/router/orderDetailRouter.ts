import {Router} from "express";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/userAuth"
import productController from "../controller/productController";
import orderDetailController from "../controller/orderDetailController";


const orderDetailRouter = Router();
orderDetailRouter.use(auth);
orderDetailRouter.use(userAuth);
orderDetailRouter.post('/add-detail', productController.buyProduct);
orderDetailRouter.get('/payment-detail', orderDetailController.getPayment);
orderDetailRouter.delete('/delete-detail/:id', orderDetailController.deleteOrderDetail);
orderDetailRouter.get('/detail/history', orderDetailController.getHistory);

export default orderDetailRouter;