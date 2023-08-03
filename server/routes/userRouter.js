import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

const { createUser, loginUser } = userController();

userRouter.route("/register").post(async (req, res) => {
  const { status_code, ...rest } = await createUser(req.body);

  return res.status(status_code).json(rest);
});

userRouter.route("/login").post(async (req, res) => {
  const { status_code, ...rest } = await loginUser(req.body);

  return res.status(status_code).json(rest);
});

export default userRouter;
