"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("../service/orderService"));
class OrderController {
    constructor() {
        this.deleteCart = async (req, res) => {
            try {
                const response = await this.orderService.deleteCart(req.params.id);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.getOrder = async (_, res) => {
            try {
                const response = await this.orderService.getOrder();
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.showCart = async (req, res) => {
            try {
                const response = await this.orderService.showCart(req.params.idOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.addCart = async (req, res) => {
            try {
                const response = await this.orderService.saveCart(req.body);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.addOrder = async (req, res) => {
            try {
                const response = await this.orderService.save(req.body);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.editOrder = async (req, res) => {
            try {
                const id = req.params.id;
                const newOrder = req.body;
                const response = await this.orderService.updateOrder(id, newOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.findByStatus = async (req, res) => {
            try {
                const idUser = req.params.idUser;
                const response = await this.orderService.findByStatusOrder(idUser);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.findById = async (req, res) => {
            try {
                const idUser = req.params.idUser;
                const response = await this.orderService.findById(idUser);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.countCart = async (req, res) => {
            try {
                const response = await this.orderService.countCart(req.params.idOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        };
        this.orderService = orderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=orderController.js.map