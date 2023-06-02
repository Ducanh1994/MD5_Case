//productService.ts
import {Product} from "../enitity/product";
import {AppDataSource} from "../data-source";
import {Between, Like} from "typeorm";

class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    getAll = async () => {
        let products = await this.productRepository.find({
            relations: {
                category: true,
            }
        });
        return products;
    }

    add = async (product) => {
        await this.productRepository.save(product);
    }
    remove = async (id) => {
        await this.productRepository
            .createQueryBuilder('Product')
            .delete()
            .from(Product)
            .where("id = :id", {id: id})
            .execute()
    }
    findProductById = async (id) => {
        return await this.productRepository.findOne({
            where: {id: id},
            relations: {category: true}
        })
    }

    findByCategoryId = async (categoryId) => {
        return await this.productRepository.find({
            where: {
                category: {id: categoryId}, // Filter based on the category ID
            },
            relations: ["category"], // Include the "category" relationship
        });
    }

    async  findByNameProduct(name) {

        let product = await this.productRepository.find({
            where: {
                name: Like(`%${name}%`)
            },
            relations: {
                category: true,
            },
        });

        if(product.length == 0){
            return "Can not find by name";
        }
        return product;
    }

    findByPrice = async (min,max)=> {
        let a = '';

        if(!min && !max){
            a=''
        }else {
            a = `where p.price >=${min} and p.price <= ${max}`;
        }
        if(!min){
            a = `where p.price <= ${max}`;
        }
        if(!max){
            a = `where p.price >= ${min}`;
        }

        let product = await this.productRepository.findBy({
            price: Between(min,max)
        });
        if(!product){
            return "Can not find by name";
        }
        return product;
    }

    editProduct = async (id, product) => {
        return await this.productRepository
            .createQueryBuilder()
            .update(Product)
            .set({
                name: product.name, price: product.price, quantity: product.quantity, image: product.image,
                category: product.category
            })
            .where("id = :id", {id: id})
            .execute()
    }
}

export default new ProductService();