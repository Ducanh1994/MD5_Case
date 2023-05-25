import {Router} from "express";
import userController from "../controller/UserController";



export const userRouter = Router();
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/', userController.getAll);