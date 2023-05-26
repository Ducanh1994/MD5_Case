import { User } from "../enitity/user";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from "../middleware/auth";
import { Order } from "../enitity/order";

class UserService {
    private userRepository;
    private orderRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    addUser = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.role = 'user';
        return this.userRepository.save(user);
    }

    checkRegister = async (user) => {
        let userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        });
        return userFound;
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        if (!users) {
            return 'Cannot get users';
        }
        return users;
    }

    createNewOrder = async (userId) => {
        let order = {
            status: false,
            totalMoney: 0,
            userId: userId,
            orderDetails: [],
        };
        return await this.orderRepository.save(order);
    }

    checkUser = async (user) => {
        let userFind = await this.userRepository.findOne({ username: user.username });
        console.log(userFind);
        if (!userFind) {
            return 'User does not exist';
        } else {
            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: userFind.role
                };
                let token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                });
                payload['token'] = token;
                return payload;
            } else {
                return 'Password is wrong';
            }
        }
    }
}

export default new UserService();
