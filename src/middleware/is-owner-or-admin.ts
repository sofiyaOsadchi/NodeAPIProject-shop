import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizCardsError from "../errors/BizCardsError";
import { productService } from "../services/product-service";


const _isProductOwnerOrAdmin: RequestHandler = async (req, _, next) => {
    const card = await productService.getProductById(req.params.id);
const userId = req.payload._id;

    if (card.userId === userId || req.payload?.isAdmin) {
        console.log(card.userId, userId, req.payload?.isAdmin);
        return next();

    }    

    else next(new BizCardsError(403, "Only the card owner or admin is allowed"))
    console.log(card.userId, userId);
};

export const isProductOwnerOrAdmin = [validateToken, _isProductOwnerOrAdmin];