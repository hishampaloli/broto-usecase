import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { JWT_SECRET, JWT_KEY } from "../utils/env";
import { createErrorWithStackResponse } from "../utils/response";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, JWT_KEY);
      req.user = decoded.data;

      next();
    } catch (error: any) {
      res
        .status(401)
        .json(
          createErrorWithStackResponse(
            400,
            "Not authorized, token fail",
            error.stack,
            req
          )
        );
    }
  }

  if (!token) {
    res
      .status(400)
      .json(createErrorWithStackResponse(400, "Not authorised", "", req));
  }
};

export const isAdmin = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
      console.log("You are not an admin");
      throw new Error("You are not an admin");
    } else {
      next();
    }
  }
);

export const isCoordinator = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== "cordinator") {
      console.log("You are not a cordinator");
      throw new Error("You are not a cordinator");
    } else {
      next();
    }
  }
);

export const isReviewer = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== "reviewer") {
      console.log("You are not a reviewer");
      throw new Error("You are not a reviewer");
    } else {
      next();
    }
  }
);
