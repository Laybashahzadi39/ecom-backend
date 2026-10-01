import mongoose from "mongoose"; 
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema); 
export default SubCategory; 