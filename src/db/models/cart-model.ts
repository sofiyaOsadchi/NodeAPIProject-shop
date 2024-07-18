import mongoose from "mongoose";
import { cartSchema } from "../schemas/cart-schema";

const cart = mongoose.model("Cart", cartSchema);


export default cart;
