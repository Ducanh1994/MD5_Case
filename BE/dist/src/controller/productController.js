"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            let listProduct = await productService_1.default.getAll();
            res.status(200).json(listProduct);
        };
        this.addProduct = async (req, res) => {
            await productService_1.default.add(req.body);
            if (!req.body.name) {
                res.status(400).json({
                    message: 'name missing'
                });
                res.end();
            }
            else {
                res.status(201).json({
                    message: 'OK'
                });
            }
        };
        this.remove = (req, res) => {
            let id = req.params.id;
            productService_1.default.remove(id);
            res.status(200).json({
                message: 'Delete success'
            });
        };
        this.findProductById = async (req, res) => {
            let id = req.params.id;
            let product = await productService_1.default.findProductById(id);
            res.status(200).json(product);
        };
        this.editProduct = async (req, res) => {
            let id = req.params.id;
            let product = req.body;
            await productService_1.default.editProduct(id, product);
            res.status(200).json({
                message: 'Edit success'
            });
        };
        this.findByPrice = async (req, res) => {
            try {
                let min = req.query.min;
                let max = req.query.max;
                let response = await productService_1.default.findByPrice(min, max);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map