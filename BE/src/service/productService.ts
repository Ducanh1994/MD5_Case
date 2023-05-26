import { Product } from "../enitity/product";
import { AppDataSource } from "../data-source";

class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    getAll = async () => {
        return await this.productRepository.find({ relations: ["category"] });
    };

    add = async (product) => {
        await this.productRepository.save(product);
    };

    remove = async (id) => {
        await this.productRepository.delete(id);
    };

    findProductById = async (id) => {
        return await this.productRepository.findOne(id, { relations: ["category"] });
    };

    findByName = async (search) => {
        const sql = `SELECT p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory
      FROM product_category pc
      JOIN product p ON pc.idProduct = p.id
      JOIN category c ON pc.idCategory = c.id
      WHERE c.name LIKE '%${search}%'`;

        return await this.productRepository.query(sql);
    };

    findByPrice = async (min, max) => {
        let whereClause = "";

        if (min && max) {
            whereClause = `WHERE p.price >= ${min} AND p.price <= ${max}`;
        } else if (!min && max) {
            whereClause = `WHERE p.price <= ${max}`;
        } else if (min && !max) {
            whereClause = `WHERE p.price >= ${min}`;
        }

        const sql = `SELECT p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory
      FROM product_category pc
      JOIN product p ON pc.idProduct = p.id
      JOIN category c ON pc.idCategory = c.id
      ${whereClause}`;

        return await this.productRepository.query(sql);
    };

    editProduct = async (id, product) => {
        await this.productRepository.update(id, product);
    };
}

export default new ProductService();
