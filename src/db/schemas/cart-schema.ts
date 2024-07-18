import { Schema } from 'mongoose';
import { ICart } from '../../@types/@types'; 
import { cartItemSchema } from './cartItemSchema';

export const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    items: [cartItemSchema],
});