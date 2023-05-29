import { Request, Response } from "express";
declare class ProductController {
    private productService;
    constructor();
    findAll: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
