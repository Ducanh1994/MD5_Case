import {User} from "../enitity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";
import {Order} from "../enitity/order";
import {OrderDetail} from "../enitity/orderDetail";
import {Product} from "../enitity/product";

class UserService {
    private userRepository;
    private orderRepository;
    private orderDetailRepository;
    private productRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.orderRepository = AppDataSource.getRepository(Order);
        this.orderRepository = AppDataSource.getRepository(OrderDetail);
        this.productRepository = AppDataSource.getRepository(Product);
    }
    addUser = async (user) => {
        user.password = await bcrypt.hash(user.password,10);
        user.role = 'user';
        return this.userRepository.save(user);
    }
    checkRegister = async (user) => {
        let userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })
        return userFound
    }

    createNewOrder = async (userId) => {
        let order = {
            status: false,
            totalMoney: 0,
            userId: userId,
            orderDetails: [],
        }
        return await this.orderRepository.save(order)
    }


    checkUser = async (user) => {
        let userFind = await this.userRepository.findOneBy({username: user.username});
        console.log(userFind)
        if (!userFind) {
            return 'User is not exist'
        } else {

            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: userFind.role
                }
                let token = await (jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                }))
                payload['token'] = token
                return payload;
            } else {
                return 'Password is wrong'
            }
        }
    }
    findOrderByUserId = async (idUser) => {
        let order = await this.orderRepository.find({
            relations: ['orderDetail', 'orderDetail.order', 'orderDetail.product', 'user.orders'],
            where: {
                status: false,
                user: {
                    id: idUser
                }
            }
        });
        return order[0];
    }

    findOrderDetailsByOrderId = async(idOrder) =>{
        let orderDetails = await this.orderDetailRepository.find({
            relations: [ 'order', 'product'],
            where: {
                orderId:{id: idOrder}
            }
        });
        return orderDetails;
    }
    buyProduct = async (idUser,idProduct) => {
        let orderFound = await this.findOrderByUserId(idUser);
        let idOrder = orderFound.id;
        let productFound = await this.productRepository.findProductById(idProduct);
        let quantityProductFound = productFound[0].quantity - 1;
        let priceProductFound = productFound[0].price;
        if (quantityProductFound < 0) {
            console.log('het hang')
        }
        else {
            await this.productRepository.updateOne({id: productFound[0].id}, {quantity: quantityProductFound}).then
            (() => {
                console.log('update so luong san pham thanh cong')
            }).catch((err)=>{
                console.log(err)
            });
            let orderDetails = await this.findOrderDetailsByOrderId(idOrder);
            let updateOrderDetail;
            for await (const orderDetailPromise of orderDetails) {
                let orderDetail = await orderDetailPromise;
                if (orderDetail['product'].id == idProduct) {
                    updateOrderDetail = orderDetail;
                }
            }
            if (updateOrderDetail) {
                updateOrderDetail.quantity += 1;
                updateOrderDetail.totalPrice = updateOrderDetail.quantity * priceProductFound;
                await this.orderDetailRepository.update({id: updateOrderDetail.id}, updateOrderDetail);
            }
            else {
                updateOrderDetail = {
                    quantity: 1,
                    price: priceProductFound,
                    totalPrice: updateOrderDetail.price * updateOrderDetail.quantity,
                    order: orderFound,
                    product: productFound
                }
                await this.orderDetailRepository.save(updateOrderDetail);
            }
            let totalMoney = 0;
            orderDetails = await this.findOrderDetailsByOrderId(idOrder);
            for (const orderDetail of orderDetails) {
                totalMoney += orderDetail.quantity * orderDetail.price;
            }
            orderFound.totalMoney = totalMoney;
            await this.orderRepository.update({id: orderFound.id}, {totalMoney}).then(()=>{
                console.log('add success')
            }).catch((err)=>{
                console.log(err)
            });
            return orderFound;
        }
    }
}

export default new UserService();