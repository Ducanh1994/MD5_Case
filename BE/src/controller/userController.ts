import {Request, Response} from "express";
import userService from "../service/userService";
import productService from "../service/productService";
class UserController {


    constructor() {}

    register = async (req:Request,res:Response) => {
        let userCheck = await userService.checkRegister(req.body);
        if(userCheck){
            res.status(200).json('User already existed!')
        }
        else if (!req.body.username || !req.body.password){
            res.status(200).json('Please fill all the information!')
        }
        else {
            await userService.addUser(req.body);
            await userService.createNewOrder(req.body.id);
            res.status(201).json('Create User Success!');
        }
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await userService.checkUser(req.body);
        res.status(200).json(resultCheck);

    }
    showProduct = async (req:Request,res:Response) => {
        let products = await productService.getAll();
        res.status(200).json(products)
    }

}

export default new UserController();