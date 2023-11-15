import { TransactionClientType } from "../../config/TransactionService";
import { userRepository } from "../../repository";
import generateToken from "../../utils/jwt";
import { Password } from "../../utils/password";

export const loginUsecase = async () => {
  const validate = async (email: string, password: string) => {
    if (!password) {
      throw Object.assign(new Error("Password is required"), {
        statusCode: 400,
      });
    }

    if (!email) {
      throw Object.assign(new Error("Email is required"), {
        statusCode: 400,
      });
    }
  };
  const execute = async (email: string, password: string): Promise<string> => {
    const user = await userRepository.getUserByEmail(email);
    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) {
      throw Object.assign(new Error("Password or Email incorrect"), {
        statusCode: 400,
      });
    }
    const token = generateToken(user);
    
    return token;
  };
  return {
    execute,
    validate,
  };
};
