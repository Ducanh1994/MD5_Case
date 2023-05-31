import {Category} from "../enitity/category";
import {AppDataSource} from "../data-source";

class CategoryService {
    private categoryRepository;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAllCategory = async () => {
        return await this.categoryRepository.find();
    }

}

export default new CategoryService();