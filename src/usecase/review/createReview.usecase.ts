import { reviewRepository } from "../../repository";

export const createReviewUsecase = async () => {
  const validate = async () => {
    // TODO: add validation
  };
  const execute = async (
    studentId: string,
    reviewerId: string,
    coordinatorId: string,
    week: string,
    date: string
  ) => {
    
    return reviewRepository.createReview({
      studentId,
      reviewerId,
      coordinatorId,
      week,
      date,
    });
  };
  return {
    execute,
    validate,
  };
};
