"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
class CategoryController {
    constructor() {
        this.findAll = async (req, res) => {
            let listProduct = await this.productService.getAll();
            res.render('index', { products: listProduct });
        };
        this.findAllCategory = async (req, res) => {
            let listCategory = await categoryService_1.default.getAllCategory();
            res.status(200).json(listCategory);
        };
        this.productService = productService_1.default;
        this.categoryService = categoryService_1.default;
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=categoryController.js.map