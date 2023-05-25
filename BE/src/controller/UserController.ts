import {Request, Response} from "express";
import userService from "../service/UserService";


class UserController {
    private userService;

    constructor() {
        this.userService = userService;
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let users = await userService.getAll();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    login = async (req: Request, res: Response)=>{
        try{
            let response = await this.userService.checkUser(req.body);
            res.status(200).json(response)
        } catch (e)
        {
            res.status(500).json(e.message)
        }
    }

    register = async (req: Request, res: Response) => {
        try{
            let response = await this.userService.register(req.body);
            res.status(201).json(response);
        } catch (e){
            res.status(500).json(e.message)
        }
    }



}

export default new UserController();