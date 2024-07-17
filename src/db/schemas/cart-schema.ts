/* import { Schema, model, Document } from 'mongoose';

interface CartItemDocument extends ICartItem, Document { }

const cartItemSchema = new Schema<CartItemDocument>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

interface CartDocument extends ICart, Document { }

const cartSchema = new Schema<CartDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
});

const Cart = model<CartDocument>('Cart', cartSchema);

export default Cart;
 */