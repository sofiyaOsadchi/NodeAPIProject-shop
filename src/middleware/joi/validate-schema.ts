import { RequestHandler } from "express";
import { ObjectSchema } from "joi";
type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

export const validateSchema: ValidateSchema =
  (schema: ObjectSchema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (e) {
      next(e);
    }
  };

 