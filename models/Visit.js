import mongoose from "mongoose";

// har din ka ek document banega, jisme us din ki total visits hongi
const visitSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;