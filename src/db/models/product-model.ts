import mongoose from "mongoose";
import cardSchema from "../schemas/product-schema";

const Card = mongoose.model("Card", cardSchema);

export default Card;