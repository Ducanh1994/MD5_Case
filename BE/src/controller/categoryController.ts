import {Request, Response} from "express";
import categoryService from "../service/CategoryService";

class CategoryController {
    private categoryService;

    constructor() {
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        let listProduct = await this.categoryService.getAll();
        res.render('index', {products: listProduct});
    }
}

export default new CategoryController();