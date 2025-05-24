import { CustomError } from "@/domain/entities/CustomErrors";
import { StatusCode } from "@/types";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export default class ErrorHandler {
  exec(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || StatusCode.InternalServerError;
    const message = err.message || "Unknown Error Occurred";
    const stack = err.stack;

    if (err instanceof CustomError) {
      res.status(statusCode).json({ message });
      return;
    }

    logger.error(message, { stack });

    res.status(statusCode).json({ message });
  }
}
