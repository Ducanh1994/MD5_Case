import {Request, Response} from "express";
import productService from "../service/productService";

class ProductController {
    private productService;

    constructor() {
        this.productService = productService;
    }

    findAll = async (req: Request, res: Response) => {
        let listProduct = await this.productService.getAll();
        res.render('index', {products: listProduct});
    }

}

export default new ProductController();