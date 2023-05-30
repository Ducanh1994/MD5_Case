"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const auth_1 = require("../middleware/auth");
const adminAuth_1 = require("../middleware/adminAuth");
const userAuth_1 = require("../middleware/userAuth");
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const productRouter = (0, express_1.Router)();
productRouter.use(auth_1.auth);
productRouter.get('/', productController_1.default.findAll);
productRouter.get('/categories', categoryController_1.default.getAll);
productRouter.post('/', adminAuth_1.adminAuth, productController_1.default.addProduct);
productRouter.delete('/:id', adminAuth_1.adminAuth, productController_1.default.remove);
productRouter.put('/:id', adminAuth_1.adminAuth, productController_1.default.editProduct);
productRouter.get('/:id', userAuth_1.userAuth, productController_1.default.findProductById);
productRouter.get('/price', productController_1.default.findByPrice);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map