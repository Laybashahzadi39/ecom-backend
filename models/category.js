import mongoose from "mongoose"; // schema banane k lye mongoose import kia

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      unique: true, 
    },
  },
  { timestamps: true } // createdAt, updatedAt automatically add ho jayenge
);

const Category = mongoose.model("Category", categorySchema); // model bnaya

export default Category; // export kia taake controller mein use ho sake