import { Router } from "express";
import { analyticsService } from "../services/analytics-service";
import { isAdmin } from "../middleware/is-admin";

const router = Router();

router.get("/inventory",  isAdmin, async (req, res, next) => {
    try {
        const inventory = await analyticsService.getInventory();
        res.json(inventory);
    } catch (e) {
        next(e);
    }
});

router.get("/total-sold", isAdmin, async (req, res, next) => {
    try {
        const totalSold = await analyticsService.getTotalSold();
        res.json({ totalSold });
    } catch (e) {
        next(e);
    }
});

router.get("/product-sales/:id", isAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productSales = await analyticsService.getProductSales(productId);
        res.json(productSales);
    } catch (e) {
        next(e);
    }
});

export { router as analyticsRouter };
