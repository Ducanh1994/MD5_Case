import {Request, Response} from "express";
import categoryService from "../service/CategoryService";
import CategoryService from "../service/CategoryService";
class CategoryController {
    private categoryService;

    constructor() {
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        let listProduct = await CategoryService.getAll();
        res.render('index', {products: listProduct});
    }

    addCategory = async (req: Request, res: Response) => {
        try {

            let newCategory = await CategoryService.saveCategory(req.body)
            res.status(200).json(newCategory);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new CategoryController();