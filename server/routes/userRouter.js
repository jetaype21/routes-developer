import express from "express";
import userController from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

const { createUser, loginUser, updateUser } = userController();

userRouter.route("/register").post(async (req, res) => {
  const { status_code, ...rest } = await createUser(req.body);

  return res.status(status_code).json(rest);
});

userRouter
  .route("/login")

  .post(async (req, res) => {
    const { status_code, ...rest } = await loginUser(req.body);

    return res.status(status_code).json(rest);
  });

// update user
userRouter.route("/:userId").patch(verifyToken, async (req, res) => {
  const { userId } = req.params;
  req.body._id = userId;
  const { status_code, ...rest } = await updateUser(req.body);

  return res.status(status_code).json(rest);
});

export default userRouter;
