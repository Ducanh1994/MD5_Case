"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const OrderService_1 = __importDefault(require("../service/OrderService"));
const CategoryService_2 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let response = await ProductService_1.default.getAll();
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findById = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.productService.findById(id);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.create = async (req, res) => {
            try {
                let p = req.body;
                if (!p.idCategory) {
                    p.idCategory = 1;
                }
                let product = {
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    totalQuantity: p.totalQuantity,
                    image: p.image
                };
                let response1 = await ProductService_1.default.save(product);
                if (response1 === 'Can not save product') {
                    res.status(200).json(response1);
                }
                else {
                    let pc = {
                        idProduct: response1.id,
                        idCategory: p.idCategory
                    };
                    let response2 = await CategoryService_1.default.save(pc);
                    res.status(200).json(response2);
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.addCategory = async (req, res) => {
            try {
                let newCategory = await CategoryService_2.default.saveCategory(req.body);
                res.status(200).json(newCategory);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.update = async (req, res) => {
            try {
                let id = req.params.id;
                let value = req.body;
                if (!value.idCategory) {
                    value.idCategory = 1;
                }
                let newProduct = {
                    name: value.name,
                    price: value.price,
                    description: value.description,
                    totalQuantity: value.totalQuantity,
                    image: value.image
                };
                let response1 = await this.productService.update(id, newProduct);
                if (response1 === 'Updated product') {
                    let pc = {
                        idProduct: id,
                        idCategory: value.idCategory
                    };
                    let response2 = await this.categoryService.update(pc);
                    return res.status(200).json(response2);
                }
                return res.status(200).json(response1);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.remove = async (req, res) => {
            try {
                let id = req.params.id;
                let response1 = await this.productService.remove(id);
                if (response1 === "Removed product") {
                    let response2 = await this.categoryService.remove(id);
                    return res.status(200).json(response2);
                }
                else {
                    return res.status(200).json(response1);
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.search = async (req, res) => {
            try {
                let search = req.query.search;
                let response = await ProductService_1.default.findByName(search);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByNameProduct = async (req, res) => {
            try {
                let search = req.query.search;
                let response = await ProductService_1.default.findByNameProduct(search);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByPrice = async (req, res) => {
            try {
                let min = req.query.min;
                let max = req.query.max;
                let response = await ProductService_1.default.findByPrice(min, max);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getCategories = async (req, res) => {
            try {
                let response = await CategoryService_1.default.getAll();
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
        this.orderService = OrderService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map