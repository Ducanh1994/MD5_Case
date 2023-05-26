"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class ProductController {
    constructor() {
        this.getCategories = async (req, res) => {
            try {
                let response = await CategoryService_1.default.getAll();
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
    }
    async findAll(req, res) {
        try {
            const listProduct = await productService_1.default.getAll();
            res.status(200).json(listProduct);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addProduct(req, res) {
        try {
            if (!req.body.name) {
                return res.status(400).json({ message: "Name missing" });
            }
            await productService_1.default.add(req.body);
            res.status(201).json({ message: "OK" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async search(req, res) {
        try {
            const search = req.query.search;
            const response = await productService_1.default.findByName(search);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async remove(req, res) {
        try {
            const id = req.params.id;
            await productService_1.default.remove(id);
            res.status(200).json({ message: "Delete success" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await productService_1.default.findProductById(id);
            res.status(200).json(product);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async editProduct(req, res) {
        try {
            const id = req.params.id;
            const product = req.body;
            await productService_1.default.editProduct(id, product);
            res.status(200).json({ message: "Edit success" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findByPrice(req, res) {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await productService_1.default.findByPrice(min, max);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map