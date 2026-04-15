import { Router } from "express";
import { GetUsers, GetUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", GetUsers);

userRouter.get("/:id", authorize, GetUser);

userRouter.post("/", (req, res) => res.send({ title: "CREATE user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user Info" }));

userRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE user Info" }),
);

export default userRouter;
