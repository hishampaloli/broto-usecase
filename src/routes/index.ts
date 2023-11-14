

import express from "express";
import authRoutes from "./authRoute";

export const routes = () => {
  const routes = express.Router();

  const authRoute = authRoutes();
  routes.use("/user", authRoute);
  
  return routes;
};