import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import courseController from "../controllers/course.controller.js";

const courseRouter = express.Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  likeCourseUser,
} = courseController();

// create course and get
courseRouter
  .route("/")
  .get(async (req, res) => {
    const { status_code, ...rest } = await getAllCourses();

    return res.status(status_code).json(rest);
  })
  .post(verifyToken, async (req, res) => {
    const { status_code, ...rest } = await createCourse(req.body);

    return res.status(status_code).json(rest);
  });

// like course and get course
courseRouter
  .route("/:courseId")
  .get(async (req, res) => {
    const { courseId } = req.params;
    const { status_code, ...rest } = await getCourseById(courseId);

    return res.status(status_code).json(rest);
  })
  .patch(verifyToken, async (req, res) => {
    const { courseId } = req.params;
    const { user_id } = req.body;
    const { status_code, ...rest } = await likeCourseUser(user_id, courseId);

    return res.status(status_code).json(rest);
  });

// update course and delete
courseRouter
  .route("/:courseId/:userId")
  .patch(verifyToken, async (req, res) => {
    const { courseId, userId } = req.params;
    req.body.user_id = userId;
    req.body._id = courseId;

    const { status_code, ...rest } = await updateCourse(req.body);

    return res.status(status_code).json(rest);
  })
  .delete(verifyToken, async (req, res) => {
    const { courseId, userId } = req.params;
    req.body.user_id = userId;
    req.body._id = courseId;

    const { status_code, ...rest } = await deleteCourse(req.body);

    return res.status(status_code).json(rest);
  });

export default courseRouter;
