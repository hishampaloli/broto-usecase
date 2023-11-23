import mongoose from "mongoose";
import { ReviewAttrs } from "../../types/types";

interface ReviewModal extends mongoose.Model<ReviewDoc> {
  build(attrs: ReviewAttrs): ReviewDoc;
}

interface ReviewDoc extends mongoose.Document {
  reviewerId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  coordinatorId: mongoose.Types.ObjectId;
  week: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  feedback: string;
  status: string;
  theoryMark: number;
  practicalMark: number;
}

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coordinatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    week: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    date: {
      type: Date,
      required: true,
    },
    feedback: {
      type: String,
    },
    status: {
      type: String,
    },
    theoryMark: {
      type: Number,
    },
    practicalMark: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

reviewSchema.set("versionKey", "version");

reviewSchema.statics.build = (attrs: ReviewAttrs) => {
  return new Review(attrs);
};

const Review = mongoose.model<ReviewDoc, ReviewModal>("Review", reviewSchema);

export { Review, ReviewDoc, ReviewAttrs };
