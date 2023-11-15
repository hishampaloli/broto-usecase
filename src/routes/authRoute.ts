import express from "express";
import { addAccount, login } from "../controller/accounts";
import { isAdmin, protect } from "../middleware/authMiddleware";

export = () => {
  const router = express.Router();

  router.post("/addAccount", protect,isAdmin, addAccount);
  router.post("/login", login);

  return router;
};
