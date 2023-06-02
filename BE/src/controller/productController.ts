import { Request, Response } from "express";
import productService from "../service/productService";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";

class ProductController {
    constructor() {}

    findAll = async (req: Request, res: Response) => {
        const listProduct = await productService.getAll();
        res.status(200).json(listProduct);
    };

    addProduct = async (req: Request, res: Response) => {
        await productService.add(req.body);
        if (!req.body.name) {
            return res.status(400).json({
                message: "name missing",
            });
        }
        res.status(201).json({
            message: "OK",
        });
    };

    remove = async (req: Request, res: Response) => {
        const id = req.params.id;
        await productService.remove(id);
        res.status(200).json({
            message: "Delete success",
        });
    };

    findProductById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await productService.findProductById(id);
        res.status(200).json(product);
    };

    findByCategoryId = async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        const products = await productService.findByCategoryId(categoryId);
        res.status(200).json(products);
    };

    editProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = req.body;
        await productService.editProduct(id, product);
        res.status(200).json({
            message: "Edit success",
        });
    };

    findByNameProduct = async (req: Request, res: Response) => {
        const name = req.query.search;
        try {
            const response = await productService.findByNameProduct(name);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    findByPrice = async (req: Request, res: Response) => {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await productService.findByPrice(min, max);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    buyProduct = async (req: Request, res: Response) => {
        const userId = req['decode'].idUser;
        const order = await orderService.findOrderByUserId(userId);
        const orderId = order.id;
        const product = req.body;
        await orderDetailService.addOrderDetail(orderId, product);
        const orderDetails = await orderDetailService.findOrderDetails(orderId);
        res.status(200).json(orderDetails);
    };
}

export default new ProductController();
