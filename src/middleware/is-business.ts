import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isBusiness: RequestHandler = (req, res, next) => {
  const { isBusiness } = req.payload;

  if (isBusiness) {
    return next();
  }

  next(new BizCardsError(403, "Must be a business"));
};

//export an array of middleware
export const isBusiness = [validateToken, _isBusiness];