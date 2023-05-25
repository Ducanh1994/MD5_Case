import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";
import orderService from "../service/OrderService";
import {productRouter} from "../router/product-router";
import CategoryService from "../service/CategoryService";
class HomeController {
    private productService;
    private categoryService;
    private orderService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
        this.orderService = orderService;
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let response = await productService.getAll();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    findById = async (req: Request, res: Response) => {
        try{
            let id = req.params.id
            let response = await this.productService.findById(id);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    create = async (req: Request, res: Response) => {
        try{
            let p = req.body;
            if(!p.idCategory){
                p.idCategory = 1
            }
            let product = {
                name : p.name,
                price : p.price,
                description : p.description,
                totalQuantity: p.totalQuantity,
                image: p.image
            };
            let response1 = await productService.save(product);
            if(response1 === 'Can not save product'){
                res.status(200).json(response1);
            } else {
                let pc = {
                    idProduct: response1.id,
                    idCategory: p.idCategory
                };
                let response2  = await categoryService.save(pc);
                res.status(200).json(response2);
            }
        } catch (e) {
            res.status(500).json(e.message);
        }


    }

    addCategory = async (req: Request, res: Response) => {
        try {

            let newCategory = await CategoryService.saveCategory(req.body)
            res.status(200).json(newCategory);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    update = async (req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let value = req.body;
            if(!value.idCategory){
                value.idCategory = 1
            }
            let newProduct = {
                name : value.name,
                price : value.price,
                description : value.description,
                totalQuantity: value.totalQuantity,
                image: value.image
            };
            let response1 = await this.productService.update(id, newProduct);
            if(response1 ==='Updated product'){
                let pc = {
                    idProduct: id,
                    idCategory: value.idCategory
                }
                let response2 = await this.categoryService.update(pc)
                return  res.status(200).json(response2)
            }
             return  res.status(200).json(response1)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    remove = async (req: Request, res: Response) => {
        try{
            let id = req.params.id;
            let response1 = await this.productService.remove(id);
            if(response1 === "Removed product"){
              let response2 = await this.categoryService.remove(id)
              return  res.status(200).json(response2)
            } else {
                return  res.status(200).json(response1)
            }
        } catch (e) {
            res.status(500).json(e.message)
        }


    }


    search = async (req: Request, res: Response) => {
        try{
            let search = req.query.search;
            let response = await productService.findByName(search);
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }

    }

    findByNameProduct = async (req: Request, res: Response) => {
        try{
            let search = req.query.search;
            let response = await productService.findByNameProduct(search);
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }

    }

    findByPrice = async (req: Request, res: Response) => {
        try{
            let min = req.query.min;
            let max = req.query.max;
            let response = await productService.findByPrice(min,max);
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
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

export default new HomeController();