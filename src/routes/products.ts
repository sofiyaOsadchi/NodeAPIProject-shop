import { Router } from "express";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import upload from "../middleware/uploads";


const router = Router();


// Add products
router.post("/", ...isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    console.log("Payload:", req.payload); // הוספת דיבאג
    if (!req.payload) {
      throw new Error("Invalid token");
    }
    const imageUrl = `https://nodeapiproject-shop.onrender.com/uploads/${req.file.filename}`;
    res.json({ imageUrl })
    const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
    const result = await productService.createProduct(productData, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", ...isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    console.log("Payload:", req.payload); // הוספת דיבאג
    if (!req.payload) {
      throw new Error("Invalid token");
    }
    const imageUrl = req.file ? `https://nodeapiproject-shop.onrender.com/uploads/${req.file.filename}` : req.body.imageUrl;
    const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
    const updatedProduct = await productService.updateProduct(req.params.id, productData);
    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
});


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
