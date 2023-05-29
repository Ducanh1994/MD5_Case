import {Router} from "express";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/userAuth"
import productController from "../controller/productController";


const orderDetailRouter = Router();
orderDetailRouter.use(auth);
orderDetailRouter.use(userAuth);
orderDetailRouter.post('/add-detail', productController.buyProduct);

export default orderDetailRouter;