import { userRepository } from "../../repository";

export const getAllUsers = async () => {
  const getStudents = async () => {
    return await userRepository.getAllStudents();
  };

  const getCordinators = async () => {
    return await userRepository.getAllCordinators();
  };

  const getReviewers = async () => {
    return await userRepository.getAllReviewers();
  };
  return {
    getStudents,
    getCordinators,
    getReviewers,
  };
};
