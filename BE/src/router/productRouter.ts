import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {userAuth} from "../middleware/userAuth";
import categoryController from "../controller/categoryController";


const productRouter = Router();
// productRouter.use(auth);
productRouter.get('/', productController.findAll);
// productRouter.get('/categories', categoryController.getAll)
// productRouter.post('/categories', adminAuth, categoryController.addCategory)
productRouter.post('/', adminAuth, productController.addProduct);
productRouter.delete('/:id', adminAuth, productController.remove);
productRouter.get('/filter', productController.findByNameProduct)
productRouter.get('/price', productController.findByPrice)

productRouter.put('/:id', adminAuth, productController.editProduct);
productRouter.get('/:id', productController.findProductById);
productRouter.get('/categories/:categoryId', productController.findByCategoryId);

export default productRouter;