import mongoose from "mongoose";
import { Password } from "../../utils/password";
import { UserAttrs } from "../../types/types";


interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  id: string;
  role: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  isBlocked: boolean;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.set("versionKey", "version");

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    role: attrs.role,
    name: attrs.name,
    email: attrs.email,
    password: attrs.password,
    phone: attrs.phone
  });
};

const User = mongoose.model<UserDoc, UserModal>(
  "User",
  userSchema
);

export { User, UserDoc,UserAttrs };
