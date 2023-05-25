"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_router_1 = require("./product-router");
const user_router_1 = require("./user-router");
const order_router_1 = require("./order-router");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/products', product_router_1.productRouter);
exports.router.use('/orders', order_router_1.orderRouter);
//# sourceMappingURL=router.js.map