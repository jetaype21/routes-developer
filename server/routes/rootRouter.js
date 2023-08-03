import express from "express";
import categoryRouter from "./categoryRouter.js";
import userRouter from "./userRouter.js";

const app = express();
const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Estas en la raiz.",
  });
});

// Rutas
app.use("/", rootRouter);
app.use("/categories", categoryRouter);
app.use("/user", userRouter);

export default app;
