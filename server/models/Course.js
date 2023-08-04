import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorys",
    required: true,
  },
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  cursos: [
    {
      type: Map,
      required: true,
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  ranking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

CourseSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  next();
});

const Course =
  mongoose.models.Courses || mongoose.model("Courses", CourseSchema);
export default Course;
