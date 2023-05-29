"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../enitity/order");
const data_source_1 = require("../data-source");
const orderDetail_1 = require("../enitity/orderDetail");
class OrderService {
    constructor() {
        this.deleteCart = async (id) => {
            const cart = await this.productOrderRepository.findOne(id);
            if (!cart) {
                return 'Cannot remove product';
            }
            await this.productOrderRepository.delete(id);
            return cart;
        };
        this.getOrder = async () => {
            const sql = "SELECT o.id, o.time, o.totalPoint, o.status, o.receiver, o.address, o.phone, u.username FROM `order` o JOIN user u ON o.userId = u.id WHERE o.status != 'buying'";
            return await this.orderRepository.query(sql);
        };
        this.showCart = async (id) => {
            const sql = `SELECT po.id, p.name, p.price, p.description, p.image, po.quantity, po.total
      FROM product_order po
      JOIN product p ON po.productId = p.id
      WHERE po.orderId = ${id}`;
            return await this.orderRepository.query(sql);
        };
        this.save = async (value) => {
            return await this.orderRepository.save(value);
        };
        this.updateOrder = async (id, newOrder) => {
            const order = await this.orderRepository.findOne(id);
            if (!order) {
                return 'Cannot update order';
            }
            await this.orderRepository.update(id, newOrder);
            return 'Updated order';
        };
        this.findById = async (idUser) => {
            const sql = `SELECT * FROM \`order\` o WHERE o.userId = ${idUser} AND o.status != 'buying'`;
            return await this.orderRepository.query(sql);
        };
        this.findByStatusOrder = async (idUser) => {
            const sql = `SELECT * FROM \`order\` o WHERE o.userId = ${idUser} AND o.status = 'buying'`;
            return await this.orderRepository.query(sql);
        };
        this.saveCart = async (values) => {
            return await this.productOrderRepository.save(values);
        };
        this.countCart = async (idOrder) => {
            const sql = `SELECT COUNT(po.orderId) AS countCart FROM product_order po WHERE po.orderId = ${idOrder}`;
            const countCart = await this.orderRepository.query(sql);
            return countCart[0].countCart;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.productOrderRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map