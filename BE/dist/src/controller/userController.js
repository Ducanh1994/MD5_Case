"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            await this.userService.register(req.body);
            res.status(201).json('Create user success');
        };
        this.login = async (req, res) => {
            let resultCheck = await this.userService.checkUser(req.body);
            res.status(200).json(resultCheck);
        };
        this.userService = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map