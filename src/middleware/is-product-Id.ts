import { RequestHandler } from "express";

import { productService } from "../services/product-service";
import BizCardsError from "../errors/BizCardsError";



const isProductId: RequestHandler = async (req, res, next) => {
    const product = await productService.getProduct(req.params.id);
    if (product) {
        return next();
    }
    next(new BizCardsError(400, "Product is not found"));
}
export default isProductId;