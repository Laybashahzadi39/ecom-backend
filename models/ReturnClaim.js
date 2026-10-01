import mongoose from "mongoose";

const returnClaimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      enum: ["return", "exchange"], // sirf ye do values allow hain
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["usable", "damaged"], // sirf ye do values allow hain
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // naya request hamesha pending se shuru hoga
    },
  },
  { timestamps: true }
);

const ReturnClaim = mongoose.model("ReturnClaim", returnClaimSchema);
export default ReturnClaim;