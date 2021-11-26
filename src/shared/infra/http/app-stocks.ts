import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes-stocks";

const appStocks = express();

appStocks.use(express.json());

appStocks.use(router);

appStocks.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { appStocks };
