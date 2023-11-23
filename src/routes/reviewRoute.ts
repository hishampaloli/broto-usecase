import express from "express";
import {
  scheduleReview,
  updateReviewMark,
  deleteReview,
} from "../controller/reviews";
import {
  isAdmin,
  protect,
  isCoordinator,
  isReviewer,
} from "../middleware/authMiddleware";

export = () => {
  const router = express.Router();

  router.post("/scheduleReview", protect, isCoordinator, scheduleReview);
  router.patch("/updateReviewMark", protect, isReviewer, updateReviewMark);
  router.delete("/delete/:reviewId", protect, deleteReview);
  return router;
};
