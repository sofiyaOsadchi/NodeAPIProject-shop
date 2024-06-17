import _ from "underscore";
import {ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";
import { Logger } from "../logs/logger";

const generateBizNumber = async () => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Card.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};

export const cardService = {
  createCard: async (data: ICardInput, userId: string) => {
    //userId is extracted from the JWT
    const card = new Card(data);
    //assign user id to the card:
    card.userId = userId;
    //generate biz number to the card:
    card.bizNumber = await generateBizNumber();

    Logger.log(card.bizNumber);

    return card.save();
  },

  getCards: async () => Card.find(),

  getCard: async (id:string) => Card.findById(id),
  
  getCardByUserId: async (userId:string) => Card.find({userId: userId}),

  getCardById: async (id: string) => Card.findById(id),

  toggleFavorite: async (userId: string, cardId: string) => {
    const card = await Card.findById(cardId);
    if (!card) throw new Error("Card not found");

    const isFavorite = card.favorites.includes(userId);
    if (isFavorite) {
      card.favorites = card.favorites.filter(fav => fav.toString() !== userId);
    } else {
      card.favorites.push(userId);
    }
    await card.save();
    return card;
  },

  updateCard: async (id: string, data: ICardInput, userId: string) => {
    const card = await Card.findOneAndUpdate({ _id: id, userId: userId }, data, { new: true });
    if (!card) throw new Error("Card not found or user unauthorized to update this card");
    return card;
  },

  deleteCard: async (id: string, userId: string) => {
    const card = await Card.findOneAndDelete({ _id: id, $or: [{ userId: userId }, { isAdmin: true }] });
    if (!card) throw new Error("Card not found or user unauthorized to delete this card");
    return card;
  },
  
};


