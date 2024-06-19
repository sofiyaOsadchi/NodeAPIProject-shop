import { Router } from "express";
import { orderService } from "../services/order-service";
import { validateToken } from "../middleware/validate-token";

const router = Router();

router.post("/", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = req.body.products;

        const order = await orderService.createOrder(userId, products);
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", validateToken, async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrder(orderId);
        res.json(order);
    } catch (e) {
        next(e);
    }
});

router.get("/user/:userId", validateToken, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orders = await orderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

export { router as orderRouter };
