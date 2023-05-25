import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";


const productRouter = Router();

// productRouter.use(auth);
productRouter.get('/', productController.findAll);
productRouter.post('/', productController.addProduct);
productRouter.delete('/:id', productController.remove);
productRouter.get('/:id', productController.findProductById);
productRouter.put('/:id', productController.editProduct);
productRouter.get('/search/findByPrice', productController.findByPrice)
export default productRouter;