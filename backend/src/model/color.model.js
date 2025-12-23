import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hexCode: {
      type: String,
      required: true, // #ff0000
      match: /^#([0-9A-Fa-f]{6})$/,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Color = mongoose.model("Color", colorSchema);
