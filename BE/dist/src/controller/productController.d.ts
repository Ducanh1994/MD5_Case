import { Request, Response } from "express";
declare class ProductController {
    constructor();
    findAll(req: Request, res: Response): Promise<void>;
    addProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    search(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
    findProductById(req: Request, res: Response): Promise<void>;
    editProduct(req: Request, res: Response): Promise<void>;
    findByPrice(req: Request, res: Response): Promise<void>;
    getCategories: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
