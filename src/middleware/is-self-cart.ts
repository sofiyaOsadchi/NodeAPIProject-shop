import { RequestHandler, Request, Response, NextFunction } from "express";
import BizProductsError from "../errors/BizCardsError";
import Product from "../db/models/product-model";
import CartModel from "../db/models/cart-model";
import { ICartItem } from "../@types/@types";
import { validateToken } from "./validate-token";

// Middleware to validate product and cart ownership
const _validateAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload._id;
        const { productId, quantity, size } = req.body;
        const product = await Product.findById(productId);

        if (!userId) {
            return next(new BizProductsError(401, "User not authenticated"));
        }

        if (!product) {
            return next(new BizProductsError(404, "Product not found"));
        }

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            // Create an empty cart for the user if not found
            cart = new CartModel({
                userId, items: [{
                    productId, quantity, size, title: product.title, price: product.price }] });
            await cart.save();
        } else {
            // Check if the cart belongs to the user
            if (cart.userId !== userId) {
                return next(new BizProductsError(403, "Cart does not belong to the user"));
            }

            await cart.save();
        }

        req.product = product; // Add product info to the request for further use
        next();
    } catch (error) {
        next(error);
    }
};


export const validateAddToCart = [validateToken, _validateAddToCart];