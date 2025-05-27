import { NextFunction, Response } from "express";
import { CustomRequest } from "@/types";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const tryCatch = <T>(
  controllerFn: (req: CustomRequest, res: Response, next: NextFunction) => Promise<T>,
) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
