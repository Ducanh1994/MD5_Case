import {Category} from "../enitity/category";
import {AppDataSource} from "../data-source";

class CategoryService {
    private categoryRepository;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAll = async () => {
        let categories = await this.categoryRepository.find();
        if(!categories){
            return 'Can not get categories'
        }
        return categories;
    }

}

export default new CategoryService();