import mongoose from "mongoose";
import { StudentProfileAttrs } from "../../types/types";



interface StudentProfileModal extends mongoose.Model<StudentProfileDoc> {
  build(attrs: StudentProfileAttrs): StudentProfileDoc;
}

interface StudentProfileDoc extends mongoose.Document {
  userId: string;
  profileStatus: number;
  batch: string;
  address: string;
  DOB: string;
  domain: string;
  age: number;
  gender: string;
  verificationId: string;
  image: any
}

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    profileStatus: {
      type: Number,
      required: true,
      default: 0,
    },
    batch: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    DOB: {
      type: String,
      required: false,
      default: null,
    },
    domain: {
      type: String,
      required: false,
      default: null,
    },
    age: {
      type: Number,
      required: false,
      default: null,
    },
    gender: {
      type: String,
      required: false,
      default: null,
    },
    verificationId: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      // type :
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

studentProfileSchema.set("versionKey", "version");

studentProfileSchema.statics.build = (attrs: StudentProfileAttrs) => {
  return new StudentProfile(attrs);
};

const StudentProfile = mongoose.model<StudentProfileDoc, StudentProfileModal>(
  "StudentProfile",
  studentProfileSchema
);

export { StudentProfile, StudentProfileDoc, StudentProfileAttrs };
