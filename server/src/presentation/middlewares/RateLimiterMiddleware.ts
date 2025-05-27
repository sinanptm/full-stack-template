import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { StatusCode } from "@/types";

export default class RateLimiterMiddleware {
  private rateLimiter: RateLimiterMemory;

  constructor(tokensPerHour: number = 111) {
    this.rateLimiter = new RateLimiterMemory({
      points: tokensPerHour,
      duration: 3600,
    });
  }

  async exec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.rateLimiter.consume(req.ip!);
      next();
    } catch (_) {
      res.status(StatusCode.RateLimitExceeded).json({
        message: "Rate limit exceeded. Please try again later.",
      });
    }
  }
}
