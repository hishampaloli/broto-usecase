import { userRepository } from "../../repository";
import { getAccoundCreatedMailTemplate } from "../../utils/mailservice";
import { createRandomPassword } from "../../utils/password";
import { sendMailUseCase } from "../external";
import { TransactionClientType } from "../../config/TransactionService";

export const blockUserUsecase = async () => {
  const validate = async (email: string, status: boolean) => {
    if (!email) {
      throw Object.assign(new Error("Email is required!"), { statusCode: 400 });
    }
    if (!status || typeof status !== "boolean") {
      throw Object.assign(
        new Error("Status is required and it should be true or false!"),
        { statusCode: 400 }
      );
    }
  };
  const execute = async (email: string, status: boolean) => {
    return userRepository.blockUserByEmail(email, status);
  };
  return {
    execute,
    validate,
  };
};
