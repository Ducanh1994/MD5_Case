"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                let res = this.userRepository.save(user);
                return res;
            }
            return 'Username registered';
        };
        this.getAll = async () => {
            let users = await this.userRepository.find();
            if (!users) {
                return 'Can not get';
            }
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck || userCheck.status === "unlock") {
                return 'Username is not existed';
            }
            let comparePassword = await bcrypt_1.default.compare(user.password, userCheck.password);
            if (!comparePassword) {
                return 'Password is wrong';
            }
            else {
                let payload = {
                    username: userCheck.username,
                    idUser: userCheck.id,
                    role: userCheck.role,
                };
                let secret = '123456';
                let check = {
                    username: userCheck.username,
                    idUser: userCheck.id,
                    role: userCheck.role,
                    token: await jsonwebtoken_1.default.sign(payload, secret, {
                        expiresIn: 360000
                    })
                };
                return check;
            }
        };
        this.save = async (value) => {
            let user = this.userRepository.save(value);
            if (!user) {
                return 'Can not save user';
            }
            return "Saved user";
        };
        this.findById = async (id) => {
            let user = await this.userRepository.findOneBy({ id: id });
            if (!user) {
                return 'Can not find by id user';
            }
            return user;
        };
        this.update = async (id, newUser) => {
            let user = await this.userRepository.update({ id: id }, newUser);
            if (!user) {
                return 'Can not update user';
            }
            return 'Updated user';
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map