import {Request, Response} from "express";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";


class OrderDetailController {
    constructor() {}
    getPayment = async (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findOrderByUserId(userId);
        let orderId = order.id;
        res.status(200).json(await orderDetailService.getPayment(orderId,userId))
    }

}

export default new OrderDetailController();