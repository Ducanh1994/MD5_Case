import {Request, Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/CategoryService";

class ProductController {

    constructor() {}

    findAll = async (req: Request, res: Response) => {
        let listProduct = await productService.getAll();
        res.status(200).json(listProduct)
    }


    addProduct = async (req: Request, res: Response) => {
        await productService.add(req.body);
        if (!req.body.name) {
            res.status(400).json({
                message: 'name missing'
            })
            res.end();
        } else {
            res.status(201).json({
                message: 'OK'
            })
        }
    }


    remove = (req: Request, res: Response) => {
        let id = req.params.id;
        productService.remove(id);
        res.status(200).json({
            message: 'Delete success'
        })
    }
    findProductById = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await productService.findProductById(id);
        res.status(200).json(product)
    }
    editProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = req.body;
        await productService.editProduct(id, product);
        res.status(200).json({
            message: 'Edit success'
        })
    }
}

export default new ProductController();