import { Router } from "express";
import { validateCard } from "../middleware/joi";
import {  productService } from "../services/product-service";
import { isBusiness } from "../middleware/is-business";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "../middleware/validate-token";
import { isCardOwnerOrAdmin } from "../middleware/is-owner-or-admin";


const router = Router();

router.delete("/:id", isCardOwnerOrAdmin, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const cardId = req.params.id;

    const deletedCard = await productService.deleteCard(cardId, userId);
    res.json({ message: "Product deleted successfully", card: deletedCard });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const cardId = req.params.id;
    const cardData = req.body;

    const updatedCard = await productService.updateCard(cardId, cardData, userId);
    res.json(updatedCard);
  } catch (e) {
    next(e);
  }
});

router.get("/my-products", validateToken, async (req, res, next) => {
  try {
    const cards = await productService.getCardByUserId(req.payload._id);
    res.json(cards);
  } catch (e) {
    next(e);
  }
});
router.post("/", ...isBusiness, validateCard, async (req, res, next) => {
  try {
    const result = await productService.createProduct(req.body, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cards = await productService.getCards();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const card = await productService.getCard(req.params.id);

    if (!card) {
      throw new BizCardsError(400, "No such card id");
      //return next(new BizCardsError(400, "No such card id"));
    }
    res.json(card);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/favorite", validateToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const cardId = req.params.id;
    const card = await productService.toggleFavorite(userId, cardId);
    res.json(card);
  } catch (e) {
    next(e);
  }
});

export { router as productRouter };
