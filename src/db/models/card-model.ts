import mongoose from "mongoose";
import cardSchema from "../schemas/card-schema";

const Card = mongoose.model("Card", cardSchema);

export default Card;