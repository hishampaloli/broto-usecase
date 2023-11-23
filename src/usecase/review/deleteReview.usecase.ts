import { reviewRepository } from "../../repository";

export const deleteReviewUsecase = async () => {
  const validate = async () => {
    // TODO: add validation
  };
  const execute = async (id: string, coordinatorId: string) => {
    return reviewRepository.deleteReview(id,coordinatorId);
  };
  return {
    execute,
    validate,
  };
};
