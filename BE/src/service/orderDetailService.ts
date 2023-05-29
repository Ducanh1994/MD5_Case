import {AppDataSource} from "../data-source";
import {OrderDetail} from "../enitity/orderDetail";
import {Product} from "../enitity/product";
import {Order} from "../enitity/order";



class OrderDetailService {
    private orderDetailRepository;
    private productRepository;
    private orderRepository;

    constructor() {
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
        this.productRepository = AppDataSource.getRepository(Product);
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    findOrderDetailByOrderId = async (orderId) => {
        return await this.orderDetailRepository.findOne({
            where: {orderId: orderId},
            relations: {order: true, product: true}
        })
    }
    addOrderDetail = async (orderId, product) => {
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
                .update(OrderDetail)
                .set({
                    price: product.price,
                    quantity: existOrderDetails[0].quantity + product.quantity,
                    totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                    order: orderId,
                    product: product.productId
                })
                .where({order: orderId, product: product.productId})
                .execute()
        } else {
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

    getPayment = async (orderId,userId) => {
        await this.editOrder(orderId,userId);
        let orderDetails = await this.orderDetailRepository.find({
            where: {
                order: {
                    id: orderId
                }
            },
            relations: {order: true, product: true}
        })
        return orderDetails;
    }
    editOrder = async (orderId,userId) => {
        await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ status:"paid" })
            .where({ id: orderId })
            .execute()
        let newOrder = {
            status: "unpaid",
            totalMoney: 0,
            orderDetails: [],
            user: userId
        };
        await this.orderRepository.save(newOrder);
    }

}

export default new OrderDetailService();