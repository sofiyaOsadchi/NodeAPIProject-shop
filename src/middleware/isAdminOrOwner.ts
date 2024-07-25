import { RequestHandler } from "express";
import { orderService } from "../services/order-service";
import { validateToken } from "./validate-token";
import BizCardsError from "../errors/BizCardsError";

const _isAdminOrOwner: RequestHandler = async (req, _, next) => {
    const userId = req.payload._id;
    const orderId = req.params.id;

    try {
        const order = await orderService.getOrder(orderId);

        if (req.payload.isAdmin || order.userId.toString() === userId) {
            return next();
        }

        next(new BizCardsError(403, "Forbidden: You do not have permission to view this order"));
    }
    catch (error) {
        next(error);
    }
};

export const isAdminOrOwner = [validateToken, _isAdminOrOwner];