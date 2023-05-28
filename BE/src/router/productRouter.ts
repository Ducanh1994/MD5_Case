import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {userAuth} from "../middleware/userAuth";
import userController from "../controller/userController";


const productRouter = Router();

productRouter.use(auth);
productRouter.get('/', productController.findAll);
productRouter.post('/', adminAuth, productController.addProduct);
productRouter.delete('/:id', adminAuth, productController.remove);

productRouter.get('/:id', productController.findProductById);

productRouter.put('/:id',adminAuth, productController.editProduct);
productRouter.get('/:id', userAuth, productController.findProductById);
productRouter.put('/order/:id', userAuth, userController.buyProduct);
export default productRouter;