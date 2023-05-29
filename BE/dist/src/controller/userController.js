"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const orderService_1 = __importDefault(require("../service/orderService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            let userCheck = await userService_1.default.checkRegister(req.body);
            if (userCheck) {
                res.status(200).json('User already existed!');
            }
            else if (!req.body.username || !req.body.password) {
                res.status(200).json('Please fill all the information!');
            }
            else {
                await userService_1.default.addUser(req.body);
                await orderService_1.default.createNewOrder(req.body);
                res.status(201).json('Create User Success!');
            }
        };
        this.login = async (req, res) => {
            let resultCheck = await userService_1.default.checkUser(req.body);
            res.status(200).json(resultCheck);
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map