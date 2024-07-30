import { Schema } from 'mongoose';
import { ICart } from '../../@types/@types';
import imageSchema from './image-schema';


const cartItemSchema = new Schema({
    productId: { type: String, required: true },
    variantId: { type: String, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: imageSchema,
});

const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    items: [cartItemSchema],
});

export default cartSchema;