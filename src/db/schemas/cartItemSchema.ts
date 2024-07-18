import { Schema } from "mongoose";
import { ICartItem } from "../../@types/@types";


export const cartItemSchema = new Schema<ICartItem>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
});