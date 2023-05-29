//orderService.ts
import { Order } from '../enitity/order';
import { AppDataSource } from '../data-source';
import { OrderDetail } from '../enitity/orderDetail';

class OrderService {
    private orderRepository;
    private productOrderRepository;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.productOrderRepository = AppDataSource.getRepository(OrderDetail);
    }

    deleteCart = async (id) => {
        const cart = await this.productOrderRepository.findOne(id);
        if (!cart) {
            return 'Cannot remove product';
        }
        await this.productOrderRepository.delete(id);
        return cart;
    };

    getOrder = async () => {
        const sql =
            "SELECT o.id, o.time, o.totalPoint, o.status, o.receiver, o.address, o.phone, u.username FROM `order` o JOIN user u ON o.userId = u.id WHERE o.status != 'buying'";
        return await this.orderRepository.query(sql);
    };

    showCart = async (id) => {
        const sql = `SELECT po.id, p.name, p.price, p.description, p.image, po.quantity, po.total
      FROM product_order po
      JOIN product p ON po.productId = p.id
      WHERE po.orderId = ${id}`;
        return await this.orderRepository.query(sql);
    };

    save = async (value) => {
        return await this.orderRepository.save(value);
    };

    updateOrder = async (id, newOrder) => {
        const order = await this.orderRepository.findOne(id);
        if (!order) {
            return 'Cannot update order';
        }
        await this.orderRepository.update(id, newOrder);
        return 'Updated order';
    };

    findById = async (idUser) => {
        const sql = `SELECT * FROM \`order\` o WHERE o.userId = ${idUser} AND o.status != 'buying'`;
        return await this.orderRepository.query(sql);
    };

    findByStatusOrder = async (idUser) => {
        const sql = `SELECT * FROM \`order\` o WHERE o.userId = ${idUser} AND o.status = 'buying'`;
        return await this.orderRepository.query(sql);
    };

    saveCart = async (values) => {
        return await this.productOrderRepository.save(values);
    };

    countCart = async (idOrder) => {
        const sql = `SELECT COUNT(po.orderId) AS countCart FROM product_order po WHERE po.orderId = ${idOrder}`;
        const countCart = await this.orderRepository.query(sql);
        return countCart[0].countCart;
    };
}

export default new OrderService();