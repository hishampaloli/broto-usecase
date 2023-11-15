import { TransactionClientType } from "../../config/TransactionService";
import { User, StudentProfile } from "../../models/mongo";
import {
  StudentProfileAttrs,
  UserAttrs,
  UserRepository,
} from "../../types/types";

const userRepository: UserRepository = {
  createUser: async (
    user: UserAttrs,
    session: TransactionClientType
  ): Promise<any> => {
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
  ): Promise<any> => {
    const mongooseObject = await StudentProfile.build(profileData);
    return await mongooseObject.save({ session });
  },

  getUserByEmail: async (email: string) => {
    const mongooseObject = await User.findOne({ email });
    return mongooseObject;
  },

  blockUserByEmail: async (email: string, status: boolean) => {
    await User.findOneAndUpdate({ email }, { isBocked: status });
  },

  editUserByEmail: async (email: string, data: object) => {
    await User.findOneAndUpdate({ email }, data);
  },

  editStudentProfile: async (userId: string, data: object) => {
    await StudentProfile.findOneAndUpdate({ userId }, data);
  },

  deleteUserByEmail: async (email: string) => {
    await User.findOneAndDelete({ email });
  },

  getAllReviewers: async () => {
    const mongooseObject = await User.find({ role: "reviewer" });
    return mongooseObject;
  },
  getAllStudents: async () => {
    const mongooseObject = await StudentProfile.find({}).populate("userId");
    return mongooseObject;
  },

  getAllCordinators: async () => {
    const mongooseObject = await User.find({ role: "coordinator" });
    return mongooseObject;
  },
};

export { userRepository };
