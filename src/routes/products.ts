import { Router } from "express";
import { validateProduct } from "../middleware/joi";
import {  productService } from "../services/product-service";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "../middleware/validate-token";
import { isProductOwnerOrAdmin } from "../middleware/is-owner-or-admin";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";


const router = Router();

//delete product
router.delete("/:id", ...isAdmin, isProductId, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", ...isAdmin, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.id;
    const productData = req.body;

    const updatedProduct = await productService.updateProduct(productId, productData, userId);
    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
});


router.post("/", ...isAdmin, async (req, res, next) => {
  try {
    const result = await productService.createProduct(req.body, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", isProductId, async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/shopping-cart", validateToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.id;
    const cart = await productService.toggleShoppingCart(userId, productId);
    res.json(cart);
  } catch (e) {
    next(e);
  }
});



router.patch("/replenish", validateToken, isAdmin, async (req, res, next) => {
  try {
    const updates = req.body;
    const products = await productService.bulkReplenishStock(updates);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

export { router as productRouter };
