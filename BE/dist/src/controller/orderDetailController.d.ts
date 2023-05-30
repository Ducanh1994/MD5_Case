import { Request, Response } from "express";
declare class OrderDetailController {
    constructor();
    getPayment: (req: Request, res: Response) => Promise<void>;
}
declare const _default: OrderDetailController;
export default _default;
