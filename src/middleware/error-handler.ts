import { ValidationError } from "joi";
import { ErrorRequestHandler } from "express";

import { MongoServerError } from "mongodb";
import BizCardsError from "../errors/BizCardsError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //my error
  if (err instanceof BizCardsError) {
    return res.status(err.status).json(err);
  }

  //Invalid Object ID:
  if (err && err.name && err.name == "CastError" && err.path && err.value) {
    return res
      .status(400)
      .json({ message: "Invalid object id", path: err.path, value: err.value });
  }
  //express json error
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  if (err instanceof MongoServerError && err.code === 11000) {
    return res.status(400).json({
      message: "duplicate key - must be unique",
      value: err.keyValue,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  //internal server error
  return res.status(500).json(err);
};

export default errorHandler;
