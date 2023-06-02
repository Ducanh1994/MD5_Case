import { Product } from "../enitity/product";
import { AppDataSource } from "../data-source";
import { Between, Like } from "typeorm";

class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    getAll = async () => {
        return await this.productRepository.find({
            relations: {
                category: true,
            },
        });
    };

    add = async (product) => {
        await this.productRepository.save(product);
    };

    remove = async (id) => {
        await this.productRepository.delete(id);
    };

    findProductById = async (id) => {
        return await this.productRepository.findOne(id, {
            relations: { category: true },
        });
    };

    findByCategoryId = async (categoryId) => {
        return await this.productRepository.find({
            where: {
                category: { id: categoryId },
            },
            relations: ["category"],
        });
    };

    findByNameProduct = async (name) => {
        const products = await this.productRepository.find({
            where: {
                name: Like(`%${name}%`),
            },
            relations: {
                category: true,
            },
        });

        if (products.length === 0) {
            return "Can not find by name";
        }

        return products;
    };

    findByPrice = async (min, max) => {
        let query = this.productRepository.createQueryBuilder('product');

        if (min && max) {
            query = query.where("product.price >= :min AND product.price <= :max", { min, max });
        } else if (min) {
            query = query.where("product.price >= :min", { min });
        } else if (max) {
            query = query.where("product.price <= :max", { max });
        }

        const products = await query.getMany();

        if (products.length === 0) {
            return "Can not find by price";
        }

        return products;
    };

    editProduct = async (id, product) => {
        return await this.productRepository.update(id, product);
    };
}

export default new ProductService();
