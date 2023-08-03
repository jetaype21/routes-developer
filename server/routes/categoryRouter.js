import express from "express";
import categoryController from "../controllers/category.controller.js";
const categoryRouter = express.Router();

const { getAllCategories, createCategory, deleteCategory, updateCategory } =
  categoryController();

categoryRouter
  .route("/")
  .get(async (req, res) => {
    const { status_code, ...rest } = await getAllCategories();

    return res.status(status_code).json(rest);
  })
  .post(async (req, res) => {
    const { status_code, ...rest } = await createCategory(req.body);

    return res.status(status_code).json(rest);
  })
  .patch(async (req, res) => {
    const { status_code, ...rest } = await updateCategory(req.body);

    return res.status(status_code).json(rest);
  })
  .delete(async (req, res) => {
    const { status_code, ...rest } = await deleteCategory(req.body);

    return res.status(status_code).json(rest);
  });

export default categoryRouter;
