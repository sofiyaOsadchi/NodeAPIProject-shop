import { Router, Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";
import { isAdmin } from "../middleware/is-admin";
import BizCardsError from "../errors/BizCardsError";

const router = Router();

router.get("/all-orders", ...isAdmin, async (req, res, next) => {
    try {
        const orders = await analyticsService.getAllOrders();
        res.json(orders);
    } catch (e) {
        next(e);
    }
});


// sales-router.js
router.get("/sales-by-date", ...isAdmin, async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        // המרת תאריכים למבנה תאריך ובדיקת פורמט
        if (!startDate || !endDate) {
            throw new BizCardsError(400, "Start date and end date are required");
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new BizCardsError(400, "Invalid date format");
        }

        if (end < start) {
            throw new BizCardsError(400, "End date cannot be earlier than start date");
        }

        const sales = await analyticsService.getSalesByDate(start, end);
        res.json(sales);
    } catch (e) {
        next(e);
    }
});



/* router.get("/inventory",  ...isAdmin, async (req, res, next) => {
    try {
        const inventory = await analyticsService.getInventory();
        res.json(inventory);
    } catch (e) {
        next(e);
    }
});


router.get("/product-sales/:id", ...isAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productSales = await analyticsService.getProductSales(productId);
        res.json(productSales);
    } catch (e) {
        next(e);
    }
}); */

router.get("/order-status", ...isAdmin, async (req, res, next) => {
    try {
        const orderStatus = await analyticsService.getOrderStatus();
        res.json(orderStatus);
    } catch (e) {
        next(e);
    }
});

router.patch("/status/:orderId", ...isAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const updatedOrder = await analyticsService.updateOrderStatus(orderId, status);
        res.json(updatedOrder);
    } catch (e) {
        next(e);
    }
});


export { router as analyticsRouter };
