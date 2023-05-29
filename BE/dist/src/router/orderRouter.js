"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get('/getOrder', orderController_1.default.getOrder);
exports.orderRouter.get('/countCart/:idOrder', orderController_1.default.countCart);
exports.orderRouter.post('/addCart', orderController_1.default.addCart);
exports.orderRouter.post('/addOrder', orderController_1.default.addOrder);
exports.orderRouter.put('/editOrder/:id', orderController_1.default.editOrder);
exports.orderRouter.get('/findByStatus/:idUser', orderController_1.default.findByStatus);
exports.orderRouter.get('/findByIdUser/:idUser', orderController_1.default.findById);
exports.orderRouter.get('/showCart/:idOrder', orderController_1.default.showCart);
exports.orderRouter.delete('/deleteCart/:id', orderController_1.default.deleteCart);
//# sourceMappingURL=orderRouter.js.map