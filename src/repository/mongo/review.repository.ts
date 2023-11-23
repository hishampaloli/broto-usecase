import { Review } from "../../models/mongo";
import { ReviewRepository, ReviewAttrs } from "../../types/types";

const reviewRepository: ReviewRepository = {
  createReview: async (data: ReviewAttrs) => {
    const mongooseObj = await Review.create(data);
    return mongooseObj;
  },

  updateReview: async (data: ReviewAttrs, id: string) => {
    const mongooseObj = await Review.findByIdAndUpdate(id, data, { new: true });
    return mongooseObj;
  },

  updateReviewMark: async (data: any, id: string, reviewerId: string) => {
    console.log(data);

    console.log(
      await Review.findOne({ _id: id, reviewerId: reviewerId }),
      reviewerId
    );

    const updatedReview = await Review.findOneAndUpdate(
      { _id: id, reviewerId },
      [
        {
          $set: {
            theoryMark: data.theoryMark,
            practicalMark: data.practicalMark,
            feedback: data.feedback,
          },
        },
        {
          $set: {
            status: {
              $cond: {
                if: {
                  $or: [
                    { $lt: ["$theoryMark", 5] },
                    { $lt: ["$practicalMark", 5] },
                  ],
                },
                then: "fail",
                else: "pass",
              },
            },
          },
        },
      ],
      { new: true }
    );
    console.log(updatedReview);

    return updatedReview;
  },

  deleteReview: async (id: string) => {
    await Review.findByIdAndDelete(id);
  },
};

export { reviewRepository };
