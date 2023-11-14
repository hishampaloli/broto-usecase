import { User, StudentProfile } from "../../models/mongo";
import {
  StudentProfileAttrs,
  UserAttrs,
  UserRepository,
} from "../../types/types";
import mongoose, { ClientSession } from "mongoose";

const userRepository: UserRepository = {
  createUser: async (user: UserAttrs) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const user_found = await User.findOne({ email: user.email });
      if (user_found) {
        throw Object.assign(new Error("User with this email already exists!"), {
          statusCode: 409,
        });
      }

      const mongooseObject = User.build(user);
      await mongooseObject.save({ session });

      await session.commitTransaction();
      session.endSession();

      return mongooseObject; // Optionally, you can return the saved user object
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
  createStudentProfile: async (profileData: StudentProfileAttrs) => {
    const mongooseObject = await StudentProfile.build(profileData);
    return await mongooseObject.save();
  },
};

export { userRepository };
