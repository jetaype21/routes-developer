import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  cursos: {
    type: Array,
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

CourseSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  this.email = this.email.toLowerCase();
  next();
});

const Course =
  mongoose.models.Courses || mongoose.model("Courses", CourseSchema);
export default Course;
