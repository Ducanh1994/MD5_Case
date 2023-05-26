import { Request, Response } from "express";
import userService from "../service/userService";
import productService from "../service/productService";

class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    register = async (req: Request, res: Response) => {
        let userCheck = await this.userService.checkRegister(req.body);
        if (userCheck) {
            res.status(200).json("User already exists!");
        } else if (!req.body.username || !req.body.password) {
            res.status(200).json("Please fill in all the information!");
        } else {
            await this.userService.addUser(req.body);
            await this.userService.createNewOrder(req.body.id);
            res.status(201).json("Create User Success!");
        }
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await this.userService.checkUser(req.body);
        res.status(200).json(resultCheck);
    }

    showProduct = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.status(200).json(products);
    }

    getAll = async (req: Request, res: Response) => {
        let users = await this.userService.getAll();
        res.status(200).json(users);
    }
}

export default new UserController();
