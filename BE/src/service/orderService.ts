<<<<<<< HEAD
import {User} from "../enitity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";
import {Order} from "../enitity/order";

class UserService {
    private userRepository;
    private orderRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.orderRepository = AppDataSource.getRepository(Order);
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

}

export default new UserService();
=======
import {AppDataSource} from "../data-source";
import {Order} from "../enitity/order";

class OrderService {
    private orderRepository;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
    }
     createNewOrder = async (user) => {
        let order = {
            status: "unpaid",
            totalMoney: 0,
            user: user,
            orderDetails: []
        }
        return await this.orderRepository.save(order)
    }
    findOrderByUserId = async (userId) => {
       return await this.orderRepository.findOne({
           where: {user: userId, status: "unpaid"},
           relations: {user: true}
       })
    }

}
export default new OrderService();
>>>>>>> f34c59c223707fd75a0643f52ec465584e2ca813
