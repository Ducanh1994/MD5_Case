import {Request, Response} from "express";
import userService from "../service/userService";

class UserController {
    private userService;
    constructor() {
        this.userService = userService;
    }

    register = async (req: Request, res: Response) => {
        await this.userService.register(req.body);
        res.status(201).json('Create user success')
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await this.userService.checkUser(req.body);
        res.status(200).json(resultCheck);
    }

    getAll = async (req:Request, res: Response) =>{
        let users = await userService.getAll();
        res.status(200).json(users)
    }

}

export default new UserController();