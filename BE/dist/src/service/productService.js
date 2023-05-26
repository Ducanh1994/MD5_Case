"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../enitity/product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAll = async () => {
            return await this.productRepository.find({ relations: ["category"] });
        };
        this.add = async (product) => {
            await this.productRepository.save(product);
        };
        this.remove = async (id) => {
            await this.productRepository.delete(id);
        };
        this.findProductById = async (id) => {
            return await this.productRepository.findOne(id, { relations: ["category"] });
        };
        this.findByName = async (search) => {
            const sql = `SELECT p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory
      FROM product_category pc
      JOIN product p ON pc.idProduct = p.id
      JOIN category c ON pc.idCategory = c.id
      WHERE c.name LIKE '%${search}%'`;
            return await this.productRepository.query(sql);
        };
        this.findByPrice = async (min, max) => {
            let whereClause = "";
            if (min && max) {
                whereClause = `WHERE p.price >= ${min} AND p.price <= ${max}`;
            }
            else if (!min && max) {
                whereClause = `WHERE p.price <= ${max}`;
            }
            else if (min && !max) {
                whereClause = `WHERE p.price >= ${min}`;
            }
            const sql = `SELECT p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory
      FROM product_category pc
      JOIN product p ON pc.idProduct = p.id
      JOIN category c ON pc.idCategory = c.id
      ${whereClause}`;
            return await this.productRepository.query(sql);
        };
        this.editProduct = async (id, product) => {
            await this.productRepository.update(id, product);
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map