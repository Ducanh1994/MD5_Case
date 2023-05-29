"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const orderDetail_1 = require("../enitity/orderDetail");
const product_1 = require("../enitity/product");
const order_1 = require("../enitity/order");
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
                where: {
                    order: {
                        id: orderId
                    },
                    product: {
                        id: product.productId
                    }
                },
            });
            if (existOrderDetails[0]) {
                await this.orderDetailRepository
                    .createQueryBuilder()
                    .update(orderDetail_1.OrderDetail)
                    .set({
                    price: product.price,
                    quantity: existOrderDetails[0].quantity + product.quantity,
                    totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                    order: orderId,
                    product: product.productId
                })
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
        this.getPayment = async (orderId, userId) => {
            await this.editOrder(orderId, userId);
            let orderDetails = await this.orderDetailRepository.find({
                where: {
                    order: {
                        id: orderId
                    }
                },
                relations: { order: true, product: true }
            });
            return orderDetails;
        };
        this.editOrder = async (orderId, userId) => {
            await this.orderRepository
                .createQueryBuilder()
                .update(order_1.Order)
                .set({ status: "paid" })
                .where({ id: orderId })
                .execute();
            let newOrder = {
                status: "unpaid",
                totalMoney: 0,
                orderDetails: [],
                user: userId
            };
            await this.orderRepository.save(newOrder);
        };
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
    }
}
exports.default = new OrderDetailService();
//# sourceMappingURL=orderDetailService.js.map