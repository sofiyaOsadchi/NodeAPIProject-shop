
import { IUser } from "../@types/@types";
import { Logger } from "../logs/logger";
import { usersService } from "../services/users-service";
import { productService } from "../services/product-service";
import { users, products } from "./initial-data";
import User from "../db/models/user-model";
import Card from "./models/product-model";

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

    for (let p of products) {
      const existingCard = await Card.findOne({ title: p.title });
      if (!existingCard) {
        const productData = { ...p, userId }; // הוספת מזהה המשתמש לכרטיס
        const savedProduct = await productService.createProduct(productData, userId);
        Logger.verbose(`Product created: ${savedProduct.title}`);
      } else {
        Logger.log(`Product already exists: ${existingCard.title}`);
      }
    }

  } catch (e) {
    Logger.error(`Database initialization failed: ${e.message}`);
  }
};

export default initDB;