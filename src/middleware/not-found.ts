import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

export { notFound };
export default notFound;