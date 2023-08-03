import Category from "../models/Category.js";
import { codeErrorInternal, codeSuccess201 } from "../utils/httpCodes.js";

const CategoryModel = Category;

export const getAllCategoriesOrm = async () => {
  try {
    const categories = await CategoryModel.find();
    return {
      status_code: codeSuccess201,
      data: categories,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message,
    };
  }
};

export const createCategoryOrm = async (category) => {
  try {
    let categoryCreate;

    await CategoryModel.create(category)
      .then((categoryRes) => (categoryCreate = categoryRes))
      .catch((err) => {
        throw new Error(err);
      });

    return {
      status_code: codeSuccess201,
      data: categoryCreate,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};

export const updateCategoryOrm = async (category) => {
  try {
    const { _id, ...rest } = category;
    let categoryUpdate;

    await CategoryModel.findByIdAndUpdate(_id, rest, { new: true })
      .then((categoryRes) => (categoryUpdate = categoryRes))
      .catch((err) => {
        throw new Error(err);
      });

    return {
      status_code: codeSuccess201,
      data: categoryUpdate,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};

export const deleteCategoryOrm = async (categoryID) => {
  try {
    let categoryDelete;

    await CategoryModel.findByIdAndDelete(categoryID)
      .then((categoryRes) => (categoryDelete = categoryRes))
      .catch((err) => {
        throw new Error(err);
      });

    return {
      status_code: codeSuccess201,
      data: categoryDelete,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};
