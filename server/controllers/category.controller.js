import {
  createCategoryOrm,
  deleteCategoryOrm,
  getAllCategoriesOrm,
  updateCategoryOrm,
} from "../orm/category.orm.js";
import { codeError404 } from "../utils/httpCodes.js";

const categoryController = () => {
  const getAllCategories = async () => await getAllCategoriesOrm();

  const createCategory = async (category) => {
    if (!category.name || !category.description)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await createCategoryOrm(category);
  };

  const updateCategory = async (category) => {
    if (!category._id || !category.name || !category.description)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await updateCategoryOrm(category);
  };

  const deleteCategory = async (category) => {
    if (!category._id)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await deleteCategoryOrm(category._id);
  };

  return { getAllCategories, createCategory, updateCategory, deleteCategory };
};

export default categoryController;
