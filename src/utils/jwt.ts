import jwt from "jsonwebtoken";
import { JWT_KEY } from "./env";

const generateToken = (data: any): string => {
  return jwt.sign({ data }, JWT_KEY!, {
    expiresIn: "10d",
  });
};

export default generateToken;
