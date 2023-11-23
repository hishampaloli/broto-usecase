import { reviewRepository } from "../../repository";

export const getUpcommingReviewsToSchedule = async () => {
  const validate = async () => {
    // TODO: add validation
  };
  const execute = async () => {
    return await reviewRepository.findUpcommingReviewsToSchedule();
  };
  return {
    execute,
    validate,
  };
};
