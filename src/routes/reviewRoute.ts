import express from "express";
import { scheduleReview, updateReviewMark } from "../controller/reviews";
import { isAdmin, protect, isCoordinator, isReviewer } from "../middleware/authMiddleware";

export = () => {
  const router = express.Router();

  router.post("/scheduleReview", protect, isCoordinator, scheduleReview);
  router.patch("/updateReviewMark", protect,isReviewer, updateReviewMark);
  return router;
};
