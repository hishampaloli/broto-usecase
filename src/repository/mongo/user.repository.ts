import { TransactionClientType } from "../../config/TransactionService";
import { User, StudentProfile } from "../../models/mongo";
import {
  StudentProfileAttrs,
  UserAttrs,
  UserRepository,
} from "../../types/types";

const userRepository: UserRepository = {
  createUser: async (user: UserAttrs, session: TransactionClientType) => {
    const user_found = await User.findOne({ email: user.email }, null, {
      session,
    });
    if (user_found)
      throw Object.assign(new Error("User with this email already exists!"), {
        statusCode: 409,
      });

    const mongooseObject = User.build(user);
    return await mongooseObject.save({ session });
  },

  createStudentProfile: async (
    profileData: StudentProfileAttrs,
    session: TransactionClientType
  ) => {
    const mongooseObject = await StudentProfile.build(profileData);
    return await mongooseObject.save({ session });
  },
};

export { userRepository };
