import { Router } from "express";
import productController from "../controller/productController";
import { auth } from "../middleware/auth";
import { adminAuth } from "../middleware/adminAuth";
import { userAuth } from "../middleware/userAuth";
import { userRouter } from "./userRouter";

const productRouter = Router();

productRouter.use(auth);

productRouter.get("/", productController.findAll);
productRouter.post("/", adminAuth, productController.addProduct);
productRouter.get("/name", productController.search);
productRouter.delete("/:id", adminAuth, productController.remove);
productRouter.get("/:id", userAuth, productController.findProductById);
productRouter.put("/:id", adminAuth, productController.editProduct);
productRouter.get("/price", productController.findByPrice);
productRouter.get('/categories',productController.getCategories)
productRouter.post('')

export default productRouter;
