import express from "express";
import userRoutes from "./userRoute";

export const routes = () => {
  const routes = express.Router();

  const userRoute = userRoutes();
  routes.use("/user", userRoute);
  
  return routes;
};