import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isAdminOrSelf: RequestHandler = (req, _, next) => {
  const requestedId = req.params.id;
  const userId = req.payload._id;

  if (requestedId === userId || req.payload?.isAdmin) {
    return next();
  }

  next(new BizCardsError(403, "Must be the requested user or admin"));
};

export const isAdminOrSelf = [validateToken, _isAdminOrSelf];