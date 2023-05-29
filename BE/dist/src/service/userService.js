"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../enitity/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const order_1 = require("../enitity/order");
const orderDetail_1 = require("../enitity/orderDetail");
const product_1 = require("../enitity/product");
class UserService {
    constructor() {
        this.addUser = async (user) => {
            user.password = await bcrypt_1.default.hash(user.password, 10);
            user.role = 'user';
            return this.userRepository.save(user);
        };
        this.checkRegister = async (user) => {
            let userFound = await this.userRepository.findOne({
                where: {
                    username: user.username
                }
            });
            return userFound;
        };
        this.createNewOrder = async (user) => {
            let order = {
                status: "unpaid",
                totalMoney: 0,
                user: user,
                orderDetails: []
            };
            return await this.orderRepository.save(order);
        };
        this.checkUser = async (user) => {
            let userFind = await this.userRepository.findOneBy({ username: user.username });
            console.log(userFind);
            if (!userFind) {
                return 'User is not exist';
            }
            else {
                let passWordCompare = await bcrypt_1.default.compare(user.password, userFind.password);
                if (passWordCompare) {
                    let payload = {
                        idUser: userFind.id,
                        username: userFind.username,
                        role: userFind.role
                    };
                    let token = await (jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000 * 10 * 100
                    }));
                    payload['token'] = token;
                    return payload;
                }
                else {
                    return 'Password is wrong';
                }
            }
        };
        this.findOrderByUserId = async (idUser) => {
            let order = await this.orderRepository.find({
                relations: ['orderDetails', 'orderDetail.order', 'orderDetail.product', 'user.orders'],
                where: {
                    status: "unpaid",
                    user: {
                        id: idUser
                    }
                }
            });
            return order[0];
        };
        this.findOrderDetailsByOrderId = async (idOrder) => {
            let orderDetails = await this.orderDetailRepository.find({
                relations: ['order', 'product'],
                where: {
                    orderId: { id: idOrder }
                }
            });
            return orderDetails;
        };
        this.buyProduct = async (idUser, idProduct) => {
            var _a, e_1, _b, _c;
            let orderFound = await this.findOrderByUserId(idUser);
            console.log(orderFound, 11);
            let idOrder = orderFound.id;
            console.log(idOrder, 11);
            let productFound = await this.productRepository.findProductById(idProduct);
            let quantityProductFound = productFound[0].quantity - 1;
            let priceProductFound = productFound[0].price;
            if (quantityProductFound < 0) {
                console.log('het hang');
            }
            else {
                await this.productRepository.updateOne({ id: productFound[0].id }, { quantity: quantityProductFound }).then(() => {
                    console.log('update so luong san pham thanh cong');
                }).catch((err) => {
                    console.log(err);
                });
                let orderDetails = await this.findOrderDetailsByOrderId(idOrder);
                let updateOrderDetail;
                try {
                    for (var _d = true, orderDetails_1 = __asyncValues(orderDetails), orderDetails_1_1; orderDetails_1_1 = await orderDetails_1.next(), _a = orderDetails_1_1.done, !_a;) {
                        _c = orderDetails_1_1.value;
                        _d = false;
                        try {
                            const orderDetailPromise = _c;
                            let orderDetail = await orderDetailPromise;
                            if (orderDetail['product'].id == idProduct) {
                                updateOrderDetail = orderDetail;
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = orderDetails_1.return)) await _b.call(orderDetails_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (updateOrderDetail) {
                    updateOrderDetail.quantity += 1;
                    updateOrderDetail.totalPrice = updateOrderDetail.quantity * priceProductFound;
                    await this.orderDetailRepository.update({ id: updateOrderDetail.id }, updateOrderDetail);
                }
                else {
                    updateOrderDetail = {
                        quantity: 1,
                        price: priceProductFound,
                        totalPrice: updateOrderDetail.price * updateOrderDetail.quantity,
                        order: orderFound,
                        product: productFound
                    };
                    await this.orderDetailRepository.save(updateOrderDetail);
                }
                let totalMoney = 0;
                orderDetails = await this.findOrderDetailsByOrderId(idOrder);
                for (const orderDetail of orderDetails) {
                    totalMoney += orderDetail.quantity * orderDetail.price;
                }
                orderFound.totalMoney = totalMoney;
                await this.orderRepository.update({ id: orderFound.id }, { totalMoney }).then(() => {
                    console.log('add success');
                }).catch((err) => {
                    console.log(err);
                });
                return orderFound;
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map