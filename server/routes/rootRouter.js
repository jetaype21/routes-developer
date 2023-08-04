import express from "express";
import categoryRouter from "./categoryRouter.js";
import userRouter from "./userRouter.js";
import courseRouter from "./courseRouter.js";

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
app.use("/course", courseRouter);

export default app;
