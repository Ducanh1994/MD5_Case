import {Product} from "../model/product";
import {AppDataSource} from "../data-source";

class ProductService {
    private productRepository
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    getAll = async () => {
        let sql =`select p.id, p.name, p.price, p.description, p.totalQuantity, p.image, c.name as nameCategory
                  from product_category pc
                           join product p on pc.idProduct = p.id
                           join category c on pc.idCategory = c.id`;
        let products = await this.productRepository.query(sql);
        if (!products){
            return 'Can not get products'
        }
        return products;
    }




    save = async (value) => {
        let product = this.productRepository.save(value);
        if(!product){
            return "Can not save product"
        }
        return  product
    }

    update = async (id, newProduct)=>{
        let product1 = await this.productRepository.findOneBy({id:id});
        if(!product1){
            return "Can not find by id product";
        }
        let product2 = this.productRepository.update({id: id}, newProduct);
        if(!product2){
            return "Can not update product"
        }
        return 'Updated product'
    }

    findById = async (id)=> {
        let sql =`select p.id, p.name, p.price, p.description, p.totalQuantity, p.image, c.name as nameCategory
                  from product_category pc
                           join product p on pc.idProduct = p.id
                           join category c on pc.idCategory = c.id where p.id = ${id}`;
        let product = await this.productRepository.query(sql);
        if(!product){
            return "Can not find by id product";
        }
        return product;
    }

    findByName = async (search)=> {
        let sql =`select p.id, p.name, p.price, p.description, p.totalQuantity, p.image, c.name as nameCategory from product_category pc join product p on pc.idProduct = p.id join category c on pc.idCategory = c.id where c.name like '%${search}%'`;
        let product = await this.productRepository.query(sql);
        if(!product){
            return "Can not find by name";
        }
        return product;
    }

    findByNameProduct = async (search)=> {
        let sql =`select p.id, p.name, p.price, p.description, p.totalQuantity, p.image, c.name as nameCategory from product_category pc join product p on pc.idProduct = p.id join category c on pc.idCategory = c.id where p.name like '%${search}%'`;
        let product = await this.productRepository.query(sql);
        if(!product){
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
        };
        if(!max){
            a = `where p.price >= ${min}`;
        }
        let sql =`select p.id, p.name, p.price, p.description, p.totalQuantity, p.image, c.name as nameCategory from product_category pc join product p on pc.idProduct = p.id join category c on pc.idCategory = c.id ${a}`;
        let product = await this.productRepository.query(sql);
        if(!product){
            return "Can not find by name";
        }
        return product;
    }

    remove = async (id)=> {
        let product = await this.productRepository.findOneBy({id:id});
        if(!product){
            return 'Can not remove product';
        }
        this.productRepository.delete({id: id});
        return  'Removed product'
    }
}

export default new ProductService();