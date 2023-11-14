import { TransactionClientType } from "../../config/TransactionService";
import { userRepository } from "../../repository";

export const createStudentProfileUsecase = async () => {
  const validate = async (batch: string) => {
    if (!batch) {
      throw Object.assign(new Error("Batch is required for the role student"), {
        statusCode: 400,
      });
    }
  };
  const execute = async (userId: string, batch: string,session: TransactionClientType) => {
    return userRepository.createStudentProfile({
      userId,
      batch,
    }, session);
  };
  return {
    execute,
    validate,
  };
};
