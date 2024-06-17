import { Router } from "express";
import { validateCard } from "../middleware/joi";
import { cardService } from "../services/card-service";
import { isBusiness } from "../middleware/is-business";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "../middleware/validate-token";
import { isCardOwnerOrAdmin } from "../middleware/is-owner-or-admin";


const router = Router();

router.delete("/:id", isCardOwnerOrAdmin, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const cardId = req.params.id;

    const deletedCard = await cardService.deleteCard(cardId, userId);
    res.json({ message: "Card deleted successfully", card: deletedCard });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const cardId = req.params.id;
    const cardData = req.body;

    const updatedCard = await cardService.updateCard(cardId, cardData, userId);
    res.json(updatedCard);
  } catch (e) {
    next(e);
  }
});

router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const cards = await cardService.getCardByUserId(req.payload._id);
    res.json(cards);
  } catch (e) {
    next(e);
  }
});
router.post("/", ...isBusiness, validateCard, async (req, res, next) => {
  try {
    const result = await cardService.createCard(req.body, req.payload._id);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cards = await cardService.getCards();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const card = await cardService.getCard(req.params.id);

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
    const card = await cardService.toggleFavorite(userId, cardId);
    res.json(card);
  } catch (e) {
    next(e);
  }
});

export { router as cardRouter };
