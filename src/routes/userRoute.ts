import express from "express";
import { addAccount, blockUser, editUser, login } from "../controller/accounts";
import { isAdmin, protect } from "../middleware/authMiddleware";

export = () => {
  const router = express.Router();

  router.post("/addAccount", protect, isAdmin, addAccount);
  router.post("/login", login);
  router.patch("/edit", protect, editUser);
  router.patch("/block", protect,isAdmin, blockUser);

  return router;
};
