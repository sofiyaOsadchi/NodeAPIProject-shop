import { NextFunction, Request, Response } from "express";

// Middleware to validate product and cart ownership
const _validateAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, variantId, quantity, size } = req.body;

        // אם המשתמש לא מחובר, אנחנו מאפשרים המשך כדי לטפל בעגלת אורח
        if (!req.payload || !req.payload._id) {
            console.log("User not authenticated, proceeding as a guest.");
            return next(); // ממשיכים כי העגלה תישמר בלוקל סטורג'
        }

        next();
    } catch (error) {
        next(error);
    }
};

// הסרת validateToken מהמעלית כדי לאפשר גם לאורחים גישה לפונקציה
export const validateAddToCart = [_validateAddToCart];