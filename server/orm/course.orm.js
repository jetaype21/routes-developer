import { codeErrorInternal, codeSuccess201 } from "../utils/httpCodes.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

const CourseModel = Course;
const UserModel = User;
const CategoryModel = Category;

export const getCourseByIdOrm = async (courseId) => {
  try {
    let courseFind;

    await CourseModel.findById({ _id: courseId })
      .populate("user_id")
      .populate("categoria_id")
      .then((res) => {
        if (!res) {
          throw new Error(`El curso con id ${courseId} no existe.`);
        }

        if (res.status === false) {
          throw new Error(`El curso con id ${courseId} está deshabilitado.`);
        }

        courseFind = res;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return {
      status_code: codeSuccess201,
      data: courseFind,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrión un error interno.",
    };
  }
};

export const getAllCoursesOrm = async () => {
  try {
    const courses = await CourseModel.find({ status: true })
      .populate("user_id")
      .populate("categoria_id")
      .exec();

    return {
      status_code: codeSuccess201,
      data: courses,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrión un error interno.",
    };
  }
};

export const likeCourseUserOrm = async (userId, courseId) => {
  try {
    let courseFind;

    await CourseModel.findById({ _id: courseId })
      .then((res) => {
        if (!res) {
          throw new Error(`El curso con id ${courseId} no existe.`);
        }

        if (res.status === false) {
          throw new Error(`El curso con id ${courseId} está deshabilitado.`);
        }

        courseFind = res;
      })
      .catch((error) => {
        throw new Error(error);
      });

    // Verificar si el usuario ya está en el ranking
    const usuarioEnRanking = courseFind.ranking.includes(userId);

    if (usuarioEnRanking) {
      // Si el usuario ya está en el ranking, quitarlo
      courseFind.ranking.pull(userId);
    } else {
      // Si el usuario no está en el ranking, agregarlo
      courseFind.ranking.push(userId);
    }

    // Guardar el courseFind actualizado
    const courseFindActualizado = await courseFind.save();

    return {
      status_code: codeSuccess201,
      data: courseFindActualizado,
    };
  } catch (error) {}
};

export const createCourseOrm = async (body) => {
  try {
    let courseCreate;

    const { user_id, categoria_id, name, cursos } = body;

    const [userRes, categoryRes] = await Promise.all([
      UserModel.findById(user_id).exec(),
      CategoryModel.findById(categoria_id).exec(),
    ]);

    if (!userRes) {
      throw new Error(`El usuario con id ${user_id} no existe.`);
    }

    if (!categoryRes) {
      throw new Error(`La categoria con id ${categoria_id} no existe.`);
    }

    const courseRes = await CourseModel.create({
      user_id,
      categoria_id,
      name,
      cursos,
    });
    courseCreate = courseRes;

    return {
      status_code: codeSuccess201,
      data: courseCreate,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};

export const updateCourseOrm = async (body) => {
  try {
    const { _id, user_id, ...rest } = body;

    let courseDelete;

    const courseFind = await CourseModel.findById(_id).exec();
    if (!courseFind) {
      throw new Error(`El curso con id ${_id} no existe.`);
    }

    if (courseFind.user_id != user_id) {
      throw new Error(
        `El usuario con id ${user_id} no es el creador del curso.`
      );
    }

    await CourseModel.findByIdAndUpdate(_id, rest, { new: true })
      .then((courseRes) => {
        if (!courseRes) {
          throw new Error(`El curso con id ${_id} no existe.`);
        }

        courseDelete = courseRes;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return {
      status_code: codeSuccess201,
      data: courseDelete,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};

export const deleteCourseOrm = async (body) => {
  try {
    const { _id, user_id } = body;

    let courseDelete;

    const courseFind = await CourseModel.findById(_id).exec();
    if (!courseFind) {
      throw new Error(`El curso con id ${_id} no existe.`);
    }

    if (courseFind.user_id.toString() != user_id) {
      throw new Error(
        `El usuario con id ${user_id} no es el creador del curso.`
      );
    }

    await CourseModel.findByIdAndUpdate(
      _id,
      {
        status: false,
      },
      { new: true }
    )
      .then((courseRes) => {
        if (!courseRes) {
          throw new Error(`El curso con id ${_id} no existe.`);
        }

        courseDelete = courseRes;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return {
      status_code: codeSuccess201,
      data: courseDelete,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};
