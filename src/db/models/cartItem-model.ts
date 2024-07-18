import mongoose from "mongoose";
import { cartItemSchema } from "../schemas/cartItemSchema";

const cartItem = mongoose.model("CartItem", cartItemSchema);


export default cartItem;