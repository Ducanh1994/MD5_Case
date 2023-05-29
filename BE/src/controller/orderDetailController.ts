import {Request, Response} from "express";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";


class OrderDetailController {
    constructor() {}
    getPayment = async (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findOrderByUserId(userId);
        let orderId = order.id;
        await orderDetailService.getPayment(orderId)
        res.status(200).json("payment success!")
    }

}

export default new OrderDetailController();