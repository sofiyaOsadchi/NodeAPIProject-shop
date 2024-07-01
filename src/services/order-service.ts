import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import { IOrderProduct } from "../@types/@types";

export const orderService = {
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new Error("Product not found");
                if (productDetails.quantity < product.quantity) throw new Error("Not enough stock");

                // Update product stock
                productDetails.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: productDetails.price,
                    size: productDetails.size,
                };
            }));

            // Calculate totalAmount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            const order = new Order({
                userId,
                products: orderProducts,
                totalAmount,
            });

            return await order.save();
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw error;
        }
    },


    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (order.status === "cancelled") {
            throw new Error("Order is already cancelled");
        }

        // Return the stock
        for (const product of order.products) {
            const productDetails = await Product.findById(product.productId);
            if (productDetails) {
                productDetails.quantity += product.quantity;
                productDetails.sold -= product.quantity;
                await productDetails.save();
            }
        }

        order.status = "cancelled";
        return await order.save();
    },



    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },



};
