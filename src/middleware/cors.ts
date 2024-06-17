import { RequestHandler } from "express";

export const cors: RequestHandler = (req, res, next) => {
  res.setHeader("access-control-allow-origin", "http://localhost:5173");
  next();
};
