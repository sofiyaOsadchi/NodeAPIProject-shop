import Cart from '../db/models/cart-model';
import Product from '../db/models/product-model';
import { ICart, ICartItem } from '../@types/@types';
import { Types } from 'mongoose';

const getCart = async (userId: string): Promise<ICart | null> => {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    return cart;
};

const addProductToCart = async (userId: string, productId: string, quantity: number): Promise<ICart | null> => {
    let cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    if (cart) {
        const itemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
    } else {
        cart = new Cart({
            userId,
            items: [{ productId, quantity }]
        });

        await cart.save();
    }

    return cart;
};

const removeProductFromCart = async (userId: string, productId: string): Promise<ICart | null> => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);

    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
        return cart;
    }

    throw new Error('Product not found in cart');
};

const clearCart = async (userId: string): Promise<ICart | null> => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new Error('Cart not found');
    }

    cart.items = [];
    await cart.save();

    return cart;
};

export {
    getCart,
    addProductToCart,
    removeProductFromCart,
    clearCart,
};
