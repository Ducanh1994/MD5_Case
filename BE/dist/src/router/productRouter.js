"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const adminAuth_1 = require("../middleware/adminAuth");
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.default.findAll);
productRouter.post('/', adminAuth_1.adminAuth, productController_1.default.addProduct);
productRouter.delete('/:id', adminAuth_1.adminAuth, productController_1.default.remove);
productRouter.get('/filter', productController_1.default.findByNameProduct);
productRouter.get('/price', productController_1.default.findByPrice);
productRouter.put('/:id', adminAuth_1.adminAuth, productController_1.default.editProduct);
productRouter.get('/:id', productController_1.default.findProductById);
productRouter.get('/categories/:categoryId', productController_1.default.findByCategoryId);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map