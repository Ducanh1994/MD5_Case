"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let users = await UserService_1.default.getAll();
                res.status(200).json(users);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let response = await this.userService.checkUser(req.body);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let response = await this.userService.register(req.body);
                res.status(201).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map