import mongoose from "mongoose";
import cartSchema from "../schemas/cart-schema";



const CartModel = mongoose.model("Cart", cartSchema);


export default CartModel;