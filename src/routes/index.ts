import express from "express";
import userRoutes from "./userRoute";
import reviewRoutes from "./reviewRoute";

export const routes = () => {
  const routes = express.Router();

  const userRoute = userRoutes();
  const reviewRoute = reviewRoutes();

  routes.use("/user", userRoute);
  routes.use("/review", reviewRoute);

  return routes;
};
