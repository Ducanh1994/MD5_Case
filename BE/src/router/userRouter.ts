import {Router} from "express";
import userController from "../controller/userController";
import {auth} from "../middleware/auth";

export const userRouter = Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

