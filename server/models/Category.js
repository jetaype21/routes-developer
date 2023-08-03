import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  description: {
    type: String,
    minLength: 15,
    required: true,
  },
});

CategorySchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.description = this.description.toLowerCase();
  next();
});

const Category =
  mongoose.models.Categorys || mongoose.model("Categorys", CategorySchema);
export default Category;
