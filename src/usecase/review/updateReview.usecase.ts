import { reviewRepository } from "../../repository";

export const updateReviewUsecase = async () => {
  const validate = async () => {
    // TODO: add validation
  };
  const executeUpdateFromReviewer = async (
    id: string,
    feedback: string,
    theoryMark: string,
    practicalMark: string,
    reviewerId: string
  ) => {
    return await reviewRepository.updateReviewMark(
      {
        feedback,
        theoryMark,
        practicalMark,
      },
      id,
      reviewerId
    );
  };
  return {
    executeUpdateFromReviewer,
    validate,
  };
};
