import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { requestlogRepository } from "../repository"; // Import your RequestLog model

export const requestLogger = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { method, path, ip, headers } = req;
      console.log('IN REQ');
      
      await requestlogRepository.AddRequestLogs({
        method,
        path,
        ipAddress: ip || "not found",
        userAgent: headers["user-agent"] || "",
      });
      next();
    } catch (error) {
      // Handle errors
      console.error("Error in RequestLog middleware:", error);
    }
  }
);
