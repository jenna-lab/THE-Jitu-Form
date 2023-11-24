"use strict";
import {
  registerUser,
  userLogin,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/userController";
import { Router } from "express";


const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/get/:id", getOneUser);


export { userRouter };
