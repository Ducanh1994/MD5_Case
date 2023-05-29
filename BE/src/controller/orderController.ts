// orderController.ts
import { Request, Response } from 'express';
import orderService from '../service/orderService';

class OrderController {
    private orderService;

    constructor() {
        this.orderService = orderService;
    }

    deleteCart = async (req: Request, res: Response) => {
        try {
            const response = await this.orderService.deleteCart(req.params.id);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    getOrder = async (_: Request, res: Response) => {
        try {
            const response = await this.orderService.getOrder();
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    showCart = async (req: Request, res: Response) => {
        try {
            const response = await this.orderService.showCart(req.params.idOrder);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    addCart = async (req: Request, res: Response) => {
        try {
            const response = await this.orderService.saveCart(req.body);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    addOrder = async (req: Request, res: Response) => {
        try {
            const response = await this.orderService.save(req.body);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    editOrder = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const newOrder = req.body;
            const response = await this.orderService.updateOrder(id, newOrder);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    findByStatus = async (req: Request, res: Response) => {
        try {
            const idUser = req.params.idUser;
            const response = await this.orderService.findByStatusOrder(idUser);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    findById = async (req: Request, res: Response) => {
        try {
            const idUser = req.params.idUser;
            const response = await this.orderService.findById(idUser);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    countCart = async (req: Request, res: Response) => {
        try {
            const response = await this.orderService.countCart(req.params.idOrder);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };
}

export default new OrderController();