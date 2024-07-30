import { NextFunction, Request, Response } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

// Middleware to validate product and cart ownership
const _validateAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload._id;
        const { productId, variantId, quantity, size } = req.body;

        if (!userId) {
            return next(new BizCardsError(401, "User not authenticated"));
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const validateAddToCart = [validateToken, _validateAddToCart];