import { Router } from "express";
import {
  GetUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", GetUsers);

userRouter.get("/:id", authorize, GetUser);

userRouter.post("/", CreateUser);

userRouter.put("/:id", authorize, UpdateUser);

userRouter.delete("/:id", authorize, DeleteUser);

export default userRouter;
