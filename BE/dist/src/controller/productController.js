"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const orderService_1 = __importDefault(require("../service/orderService"));
const orderDetailService_1 = __importDefault(require("../service/orderDetailService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            const listProduct = await productService_1.default.getAll();
            res.status(200).json(listProduct);
        };
        this.addProduct = async (req, res) => {
            await productService_1.default.add(req.body);
            if (!req.body.name) {
                return res.status(400).json({
                    message: "name missing",
                });
            }
            res.status(201).json({
                message: "OK",
            });
        };
        this.remove = async (req, res) => {
            const id = req.params.id;
            await productService_1.default.remove(id);
            res.status(200).json({
                message: "Delete success",
            });
        };
        this.findProductById = async (req, res) => {
            const id = req.params.id;
            const product = await productService_1.default.findProductById(id);
            res.status(200).json(product);
        };
        this.findByCategoryId = async (req, res) => {
            const categoryId = req.params.categoryId;
            const products = await productService_1.default.findByCategoryId(categoryId);
            res.status(200).json(products);
        };
        this.editProduct = async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            await productService_1.default.editProduct(id, product);
            res.status(200).json({
                message: "Edit success",
            });
        };
        this.findByNameProduct = async (req, res) => {
            const name = req.query.search;
            try {
                const response = await productService_1.default.findByNameProduct(name);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByPrice = async (req, res) => {
            try {
                const min = req.query.min;
                const max = req.query.max;
                const response = await productService_1.default.findByPrice(min, max);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.buyProduct = async (req, res) => {
            const userId = req['decode'].idUser;
            const order = await orderService_1.default.findOrderByUserId(userId);
            const orderId = order.id;
            const product = req.body;
            await orderDetailService_1.default.addOrderDetail(orderId, product);
            const orderDetails = await orderDetailService_1.default.findOrderDetails(orderId);
            res.status(200).json(orderDetails);
        };
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map