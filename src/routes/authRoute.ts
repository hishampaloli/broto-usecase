import express from "express";
import { addAccount } from "../controller/accounts";

export = () => {
  const router = express.Router();

  router.post("/login", addAccount);

  return router;
};
