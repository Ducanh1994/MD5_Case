"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("../service/orderService"));
const orderDetailService_1 = __importDefault(require("../service/orderDetailService"));
class OrderDetailController {
    constructor() {
        this.getPayment = async (req, res) => {
            let userId = req['decode'].idUser;
            let order = await orderService_1.default.findOrderByUserId(userId);
            let orderId = order.id;
            res.status(200).json(await orderDetailService_1.default.getPayment(orderId, userId));
        };
    }
}
exports.default = new OrderDetailController();
//# sourceMappingURL=orderDetailController.js.map