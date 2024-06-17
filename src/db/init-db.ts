import { IUser } from "../@types/@types";
import { Logger } from "../logs/logger";
import { usersService } from "../services/users-service";
import { users } from "./initial-data";
import User from "./models/user-model";

const initDB = async () => {
  try {
    const usersCount = await User.countDocuments();

    if (usersCount != 0) return;

    for (let u of users) {
      const saved = await usersService.createUser(u);
      Logger.verbose(saved);
    }
    //TODO: card must have a user id
  } catch (e) {
    Logger.log(e);
  }
};

export default initDB;
