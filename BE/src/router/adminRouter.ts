import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {userAuth} from "../middleware/userAuth"
import adminController from "../controller/adminController";
import {userRouter} from "./userRouter";


const productRouter = Router();

productRouter.use(auth);
productRouter.get('/alluser',adminAuth, adminController.showAllAcount);
productRouter.put('/rerole',adminAuth, adminController.reRole);
// productRouter.post('/', adminAuth, productController.addProduct);
// productRouter.delete('/:id', adminAuth, productController.remove);
// productRouter.get('/:id', userAuth, productController.findProductById);
// productRouter.put('/:id',adminAuth, productController.editProduct);
export default productRouter;