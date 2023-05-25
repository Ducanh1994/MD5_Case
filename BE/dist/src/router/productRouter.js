"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const auth_1 = require("../middleware/auth");
const productRouter = (0, express_1.Router)();
productRouter.use(auth_1.auth);
productRouter.get('/', productController_1.default.findAll);
productRouter.post('/', productController_1.default.addProduct);
productRouter.delete('/:id', productController_1.default.remove);
productRouter.get('/:id', productController_1.default.findProductById);
productRouter.put('/:id', productController_1.default.editProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map