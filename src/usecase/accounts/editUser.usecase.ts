import { userRepository } from "../../repository";
import { getAccoundCreatedMailTemplate } from "../../utils/mailservice";
import { createRandomPassword } from "../../utils/password";
import { sendMailUseCase } from "../external";
import { TransactionClientType } from "../../config/TransactionService";

export const editUserUsecase = async () => {
  const validate = async (data: any, role: string) => {
    if (role !== "admin") {
      if ("email" in data) {
        delete data.email;
      }
      if ("role" in data) {
        delete data.role;
      }
    }
  };
  const execute = async (email: string, data: object) => {
    return userRepository.editUserByEmail(email, data);
  };
  return {
    execute,
    validate,
  };
};
