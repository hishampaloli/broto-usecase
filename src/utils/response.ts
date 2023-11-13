import express, { Request, Response, NextFunction } from "express";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: number;
  ip?: string;
  method: string;
  url: string;
  headers: Record<string, string>;
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: number;
    message: string;
    stack?: string;
  };
  timestamp: number;
  ip?: string;
  method: string;
  url: string;
  headers: Record<string, string>;
}

function createSuccessResponse<T>(data: T, req: Request): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: Date.now(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    headers: req.headers as Record<string, string>,
  };
}

function createErrorResponse(
  code: number,
  message: string,
  req: Request
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
    timestamp: Date.now(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    headers: req.headers as Record<string, string>,
  };
}

export function createNotFoundResponse(req: Request): ApiErrorResponse {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: 404,
        message: 'Not Found',
      },
      timestamp: Date.now(),
      ip: req.ip,
      method: req.method,
      url: req.url,
      headers: req.headers as Record<string, string>,
    };
  
    return errorResponse;
  }

function createErrorWithStackResponse(
  code: number,
  message: string,
  stack: string,
  req: Request
): ApiErrorResponse {
  const errorResponse: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      stack,
    },
    timestamp: Date.now(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    headers: req.headers as Record<string, string>,
  };

  return errorResponse;
}

export {
  createSuccessResponse,
  createErrorResponse,
  ApiErrorResponse,
  createErrorWithStackResponse,
};
