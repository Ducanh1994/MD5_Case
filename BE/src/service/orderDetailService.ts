import {AppDataSource} from "../data-source";
import {OrderDetail} from "../enitity/orderDetail";
import productService from "./productService";


class OrderDetailService {
    private orderDetailRepository;

    constructor() {
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    }

    findOrderDetailByOrderId = async (orderId) => {
        return await this.orderDetailRepository.findOne({
            where: {orderId: orderId},
            relations: {order: true, product: true}
        })
    }
    addOrderDetail = async (orderId, product) => {
        let existOrderDetails = await this.orderDetailRepository.find({
            where: {order: orderId, product: product.productId},
        });
        if (existOrderDetails) {
                await this.orderDetailRepository
                        .createQueryBuilder()
                            .update(OrderDetail)
                            .set({ price: product.price,
                                quantity: existOrderDetails[0].quantity + product.quantity,
                                totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                                order: orderId,
                                product: product.productId })
                            .where({ order: orderId, product: product.productId })
                            .execute()
                }
                else {
                    let newOrderDetail = {
                        price: product.price,
                        quantity: product.quantity,
                        totalPrice: product.price * product.quantity,
                        order: orderId,
                        product: product.productId
                    }
                    await this.orderDetailRepository.save(newOrderDetail)
                }
            }



}

export default new OrderDetailService();