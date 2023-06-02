import { Request, Response } from "express";
declare class ProductController {
    constructor();
    findAll: (req: Request, res: Response) => Promise<void>;
    addProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    remove: (req: Request, res: Response) => Promise<void>;
    findProductById: (req: Request, res: Response) => Promise<void>;
    findByCategoryId: (req: Request, res: Response) => Promise<void>;
    editProduct: (req: Request, res: Response) => Promise<void>;
    findByNameProduct: (req: Request, res: Response) => Promise<void>;
    findByPrice: (req: Request, res: Response) => Promise<void>;
    buyProduct: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
