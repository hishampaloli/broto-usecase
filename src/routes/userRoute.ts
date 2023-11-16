import express from "express";
import {
  addAccount,
  blockUser,
  editUser,
  login,
  getAllStudents,
} from "../controller/accounts";
import { isAdmin, protect } from "../middleware/authMiddleware";

export = () => {
  const router = express.Router();

  router.post("/addAccount", protect, isAdmin, addAccount);
  router.post("/login", login);
  router.patch("/edit", protect, editUser);
  router.patch("/block", protect, isAdmin, blockUser);
  router.get("/students", getAllStudents);

  return router;
};
