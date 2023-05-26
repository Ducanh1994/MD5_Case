import { Request, Response } from "express";
import productService from "../service/productService";
import categoryService from "../service/CategoryService";

class ProductController {
    constructor() {}

    async findAll(req: Request, res: Response) {
        try {
            const listProduct = await productService.getAll();
            res.status(200).json(listProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addProduct(req: Request, res: Response) {
        try {
            if (!req.body.name) {
                return res.status(400).json({ message: "Name missing" });
            }

            await productService.add(req.body);
            res.status(201).json({ message: "OK" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async search(req: Request, res: Response) {
        try {
            const search = req.query.search;
            const response = await productService.findByName(search);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await productService.remove(id);
            res.status(200).json({ message: "Delete success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findProductById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const product = await productService.findProductById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async editProduct(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const product = req.body;
            await productService.editProduct(id, product);
            res.status(200).json({ message: "Edit success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByPrice(req: Request, res: Response) {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await productService.findByPrice(min, max);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getCategories = async (req: Request, res: Response) => {
        try{
            let response = await categoryService.getAll();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new ProductController();
