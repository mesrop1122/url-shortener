import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const data = authService.verifyToken(req.headers.authorization);
  if (data.status === 200) {
    return next();
  }
  return res.status(data.status).json(data.payload);
};
