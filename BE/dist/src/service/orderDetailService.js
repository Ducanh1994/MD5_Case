"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const orderDetail_1 = require("../enitity/orderDetail");
class OrderDetailService {
    constructor() {
        this.findOrderDetailByOrderId = async (orderId) => {
            return await this.orderDetailRepository.findOne({
                where: { orderId: orderId },
                relations: { order: true, product: true }
            });
        };
        this.addOrderDetail = async (orderId, product) => {
            let existOrderDetails = await this.orderDetailRepository.find({
                where: { order: orderId, product: product.productId },
            });
            if (existOrderDetails) {
                await this.orderDetailRepository
                    .createQueryBuilder()
                    .update(orderDetail_1.OrderDetail)
                    .set({ price: product.price,
                    quantity: existOrderDetails[0].quantity + product.quantity,
                    totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                    order: orderId,
                    product: product.productId })
                    .where({ order: orderId, product: product.productId })
                    .execute();
            }
            else {
                let newOrderDetail = {
                    price: product.price,
                    quantity: product.quantity,
                    totalPrice: product.price * product.quantity,
                    order: orderId,
                    product: product.productId
                };
                await this.orderDetailRepository.save(newOrderDetail);
            }
        };
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderDetailService();
//# sourceMappingURL=orderDetailService.js.map