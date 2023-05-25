
import {Category} from "../model/category";
import {AppDataSource} from "../data-source";
import {ProductCategory} from "../model/product-category";

class CategoryService {
    private categoryRepository
    private product_categoryRepository
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.product_categoryRepository = AppDataSource.getRepository(ProductCategory)
    }

    getAll = async () => {
        let categories = await this.categoryRepository.find();
        if(!categories){
            return 'Can not get categories'
        }
        return categories;
    }


    save = async (productCategory) => {
        let pc = this.product_categoryRepository.save(productCategory);
        if(!pc){
            return 'Can not save product-category'
        }
        return  'Saved product-category'
    }

    saveCategory = async (category) => {
        return this.categoryRepository.save(category);
    }

    remove = async (idProduct)=> {
        let pc = await this.product_categoryRepository.findOneBy({idProduct:idProduct});
        if(!pc){
            return "Can not remove product-category";
        }
        this.product_categoryRepository.delete({idProduct: idProduct});
        return "Removed product-category"
    }

    update = async (value)=>{
        let pc1 = await this.product_categoryRepository.findOneBy({idProduct:value.idProduct});
        if(!pc1){
            return "Can not find by id product-category";
        }
        let pc2 = this.product_categoryRepository.update({id: pc1.id}, value);
        if(!pc2){
            return "Can not update product-category"
        }
        return 'Updated product-category'
    }


}

export default new CategoryService();