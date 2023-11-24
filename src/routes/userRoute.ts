"use strict";
import { registerUser, userLogin } from "../controllers/userController";
import { Router } from "express";


const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);

export { userRouter };
