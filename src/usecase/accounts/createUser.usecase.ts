import { userRepository } from "../../repository";
import { getAccoundCreatedMailTemplate } from "../../utils/mailservice";
import { createRandomPassword } from "../../utils/password";
import { sendMailUseCase } from "../external";
import { TransactionClientType } from "../../config/TransactionService";

export const createUserUsecase = async () => {
  const validate = async (
    name: string,
    email: string,
    phone: number,
    role: string
  ) => {
    if (!name || !email || !phone || !role) {
      throw Object.assign(new Error("Invalid input!"), { statusCode: 400 });
    }
  };
  const execute = async (
    name: string,
    email: string,
    phone: number,
    role: string,
    session: TransactionClientType
  ) => {
    const password = createRandomPassword();
    const mailResponse = getAccoundCreatedMailTemplate(email, password);
    // await sendMailUseCase().execute({
    //   userEmail: email,
    //   subject: "Account created.",
    //   response: mailResponse,
    // });
    console.log(password,'PASSWORD');
    
    return userRepository.createUser({
      email,
      name,
      password,
      phone,
      role,
    }, session);
  };
  return {
    execute,
    validate,
  };
};
