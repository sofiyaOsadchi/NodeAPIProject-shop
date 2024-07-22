import Product from '../db/models/product-model';
import { ICart, ICartWithTotals } from '../@types/@types';
import CartModel from '../db/models/cart-model';


export const cartService = {


    getCartById: async (userId: string): Promise<ICartWithTotals | null> => { // עדכון הטיפוס המוחזר
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.productId');

            if (!cart) {
                return null;
            }

            // חישוב כמות מוצרים סך הכל והמחיר של כל המוצרים יחד
            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

            // הוספת חישובים למידע המוחזר
            return {
                ...cart.toObject(),
                totalQuantity,
                totalPrice
            } as ICartWithTotals; // שינוי טיפוס המידע המוחזר

        } catch (error) {
            console.error("Error fetching cart:", error); // Debugging
            throw new Error('Error fetching cart');
        }
    },



    addProductToCart: async (userId: string, productId: string, quantity: number, size: string): Promise<ICart | null> => {
        // First, find the cart for the user
        let cart = await CartModel.findOne({ userId });

        // Check if the product exists in the database
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // If no cart exists, create a new cart
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [{ productId, quantity }]
            });
        }
        // If the cart exists, check if the product already exists in the cart
        else {
            const itemIndex = cart.items.findIndex((item) => item.productId === productId);

            // If the product exists, update the quantity
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }

            // If the product does not exist, add it to the cart
            else {
                cart.items.push({ productId, quantity, size: size, title: product.title, price: product.price, image: product.image });
            }
        }

        // Save the cart to the database
        await cart.save();
        return cart;
    },


    removeProductFromCart: async (userId: string, productId: string, quantity: number): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex((item) => item.productId === productId);

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > quantity) {
                cart.items[itemIndex].quantity -= quantity;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            return cart;
        }

        throw new Error('Product not found in cart');
    },


    clearCart: async (userId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    }

};