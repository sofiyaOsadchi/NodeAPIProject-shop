
import { IUser } from "../@types/@types";
import { Logger } from "../logs/logger";
import { usersService } from "../services/users-service";
import { cardService } from "../services/card-service";
import { users, cards } from "./initial-data";
import User from "../db/models/user-model";
import Card from "../db/models/card-model";

const initDB = async () => {
  try {
    const usersCount = await User.countDocuments();

    if (usersCount >= 3) {
      Logger.log("3 or more users already exist. Skipping user initialization.");
    } else {
      for (let u of users) {
        const existingUser = await User.findOne({ email: u.email });
        if (!existingUser) {
          const saved = await usersService.createUser(u);
          Logger.verbose(`User created: ${saved.email}`);
        } else {
          Logger.log(`User already exists: ${existingUser.email}`);
        }
      }
    }

    const cardsCount = await Card.countDocuments();
    if (cardsCount >= 3) {
      Logger.log("3 or more cards already exist. Skipping card initialization.");
      return;
    }

    const user = await User.findOne();
    if (!user) {
      Logger.error("No user found to associate cards with.");
      return;
    }
    const userId = user._id.toString();

    for (let c of cards) {
      const existingCard = await Card.findOne({ title: c.title });
      if (!existingCard) {
        const cardData = { ...c, userId }; // הוספת מזהה המשתמש לכרטיס
        const savedCard = await cardService.createCard(cardData, userId);
        Logger.verbose(`Card created: ${savedCard.title}`);
      } else {
        Logger.log(`Card already exists: ${existingCard.title}`);
      }
    }

  } catch (e) {
    Logger.error(`Database initialization failed: ${e.message}`);
  }
};

export default initDB;