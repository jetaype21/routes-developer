import {
  createCourseOrm,
  deleteCourseOrm,
  updateCourseOrm,
  getAllCoursesOrm,
  getCourseByIdOrm,
  likeCourseUserOrm,
} from "../orm/course.orm.js";
import { codeError404 } from "../utils/httpCodes.js";

const courseController = () => {
  const createCourse = async (body) => {
    if (
      !body.user_id ||
      !body.categoria_id ||
      !body.name ||
      !body.cursos.length > 0
    )
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await createCourseOrm(body);
  };

  const updateCourse = async (body) => {
    if (
      !body.user_id ||
      !body._id ||
      !body.categoria_id ||
      !body.name ||
      !body.cursos
    )
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await updateCourseOrm(body);
  };

  const deleteCourse = async (body) => {
    if (!body.user_id || !body._id)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await deleteCourseOrm(body);
  };

  const getAllCourses = async () => {
    return await getAllCoursesOrm();
  };

  const getCourseById = async (courseId) => {
    return await getCourseByIdOrm(courseId);
  };

  const likeCourseUser = async (userId, courseId) => {
    if (!userId || !courseId)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await likeCourseUserOrm(userId, courseId);
  };

  return {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    likeCourseUser,
  };
};

export default courseController;
