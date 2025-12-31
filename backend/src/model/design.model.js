import mongoose from "mongoose";
const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    images: {
      front: String,
      back: String,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Design = mongoose.model(
    "Design",
    designSchema
);