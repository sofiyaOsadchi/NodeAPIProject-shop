import { ICart, ICartWithTotals } from "../@types/@types";
import CartModel from "../db/models/cart-model";
import Product from "../db/models/product-model";
import BizCardsError from "../errors/BizCardsError";

export const cartService = {
    getCartById: async (userId: string): Promise<ICartWithTotals | null> => {
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.variantId');

            if (!cart) {
                return null;
            }

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

            return {
                ...cart.toObject(),
                totalQuantity,
                totalPrice
            } as ICartWithTotals;

        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new BizCardsError(400, 'Error fetching cart');
        }
    },


    addProductToCart: async (
        userId: string,
        productId: string,
        variantId: string,
        quantity: number,
        size: string,

    ): Promise<ICart | null> => {
        console.log(`Starting addProductToCart for user: ${userId} with product: ${productId} and variant: ${variantId}`);
        let cart = await CartModel.findOne({ userId });

        const product = await Product.findById(productId);
        if (!product) {
            console.error(`Product not found for productId: ${productId}`);
            throw new BizCardsError(404, 'Product not found');
        }

        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (!variant) {
            console.error(`Variant not found for variantId: ${variantId}`);
            throw new BizCardsError(404, 'Variant not found');
        }

        if (!cart) {
            console.log(`No cart found for userId: ${userId}, creating new cart.`);
            cart = new CartModel({
                userId,
                items: [
                    {
                        productId,
                        variantId,
                        quantity,
                        size,
                        title: product.title,
                        price: variant.price,
                        image: product.image,
                    },
                ],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.productId === productId && item.size === size && item.variantId === variantId
            );

            if (itemIndex > -1) {
                console.log(`Item found in cart, updating quantity for userId: ${userId}, productId: ${productId}, variantId: ${variantId}`);
                cart.items[itemIndex].quantity += quantity;
            } else {
                console.log(`Item not found in cart, adding new item for userId: ${userId}, productId: ${productId}, variantId: ${variantId}`);
                cart.items.push({
                    productId,
                    variantId,
                    quantity,
                    size,
                    title: product.title,
                    price: variant.price,
                    image: product.image,
                });
            }
        }

        await cart.save();
        console.log(`Cart saved successfully for userId: ${userId}`);
        return cart;
    },
    removeProductFromCart: async (userId: string, variantId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizCardsError(404, 'Cart not found');
        }

        cart.items = cart.items.filter((item) => item.variantId !== variantId);

        await cart.save();
        return cart;
    },

    updateQuantityInCart: async (userId: string, productId: string, variantId: string, quantity: number,): Promise<ICart | null> => {
        console.log(`Updating cart for userId: ${userId}, variantId: ${variantId}, quantity: ${quantity}`);

        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            console.error(`Cart not found for userId: ${userId}`);
            throw new BizCardsError(404, 'Cart not found');
        }

        const itemIndex = cart.items.findIndex((item) => item.variantId === variantId);
        if (itemIndex === -1) {
            console.error(`Product not found in cart for variantId: ${variantId}`);
            throw new BizCardsError(404, 'Product not found in cart');
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        console.log(`Cart updated successfully for userId: ${userId}`);

        return cart;
    },

    clearCart: async (userId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizCardsError(404, 'Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    }
};