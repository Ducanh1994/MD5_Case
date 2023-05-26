"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const productService_1 = __importDefault(require("../service/productService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            let userCheck = await this.userService.checkRegister(req.body);
            if (userCheck) {
                res.status(200).json("User already exists!");
            }
            else if (!req.body.username || !req.body.password) {
                res.status(200).json("Please fill in all the information!");
            }
            else {
                await this.userService.addUser(req.body);
                await this.userService.createNewOrder(req.body.id);
                res.status(201).json("Create User Success!");
            }
        };
        this.login = async (req, res) => {
            let resultCheck = await this.userService.checkUser(req.body);
            res.status(200).json(resultCheck);
        };
        this.showProduct = async (req, res) => {
            let products = await productService_1.default.getAll();
            res.status(200).json(products);
        };
        this.getAll = async (req, res) => {
            let users = await this.userService.getAll();
            res.status(200).json(users);
        };
        this.userService = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map