import { Router } from "express";
import { validateProduct } from "../middleware/joi";
import { productService } from "../services/product-service";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "../middleware/validate-token";
import { isProductOwnerOrAdmin } from "../middleware/is-owner-or-admin";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
/* import upload from "../../multer-config/multer-config"; */
import User from "../db/models/user-model";
import multer from "multer";
import path from "path";
import upload from "../middleware/uploads";


const router = Router();

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); */

// Add product
router.post("/", ...isAdmin, upload.single("image"), validateProduct, async (req, res, next) => {
  try {
    console.log("Payload:", req.payload); // הוספת דיבאג
    if (!req.payload) {
      throw new Error("Invalid token");
    }
    const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
    res.json({ imageUrl })
    const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
    const result = await productService.createProduct(productData, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

// Update product
router.put("/:id",  ...isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    console.log("Payload:", req.payload); // הוספת דיבאג
    if (!req.payload) {
      throw new Error("Invalid token");
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
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

//update product
/* router.put("/:id", ...isAdmin, isProductId, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(productId, productData, userId);
    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
}); */


/* router.post("/", upload.single('image'), validateProduct, isAdmin, async (req, res, next) => { 
  try { 
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 
    const productData = { ...req.body, imageUrl }; 
    const result = await productService.createProduct(productData, req.payload._id); 
    res.status(201).json(result); 
  } catch (e) { 
    next(e); 
  }
 }); */


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
