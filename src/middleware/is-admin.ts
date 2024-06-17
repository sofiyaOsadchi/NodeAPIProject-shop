import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isAdmin: RequestHandler = (req, _, next) => {
  if (req.payload?.isAdmin) {
    return next();
  }

  next(new BizCardsError(403, "Must be admin"));
};

export const isAdmin = [validateToken, _isAdmin];
