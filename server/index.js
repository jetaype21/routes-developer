// dependencias
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// local
import rootRouter from "./routes/rootRouter.js";
import morgan from "morgan";
// import User from "./models/User.js";
// import { categorias, users } from "./data.js";
// import Category from "./models/Category.js";

const app = express();

//CONFIGURACIONES
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      // User.insertMany(users);
      // Category.insertMany(categorias);
      console.log(`Server running on port localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// RUTA PRINCIPAL
app.use("/api", rootRouter);
