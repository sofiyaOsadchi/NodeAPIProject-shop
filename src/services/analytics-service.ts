import Product from "../db/models/product-model";
import Order from "../db/models/order-model";
import { IOrderProduct } from "../@types/@types";

export const analyticsService = {
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            title: product.title,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },

        getAllOrders: async () => {
            const orders = await Order.find().populate({
                path: 'userId',
                select: 'name', // אכלוס השדה name מתוך userId
            }).populate('products.productId');
            return orders.map(order => ({
                orderId: order._id,
                userId: order.userId._id,
                products: order.products.map(product => ({
                    productId: product.productId._id,
                    title: product.title,
                    barcode: product.barcode,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
            }));
        },

    getSalesByDate: async (startDate: Date, endDate: Date) => {
        const orders = await Order.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        }).populate("userId").populate("products.productId");

        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalOrders = orders.length;

        return {
            totalRevenue,
            totalOrders,
        };
    },

    getTotalSold: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + product.sold, 0);
    },

    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return {
            title: product.title,
            sold: product.sold,
        };
    },


    getOrderStatus: async () => {
        const orders = await Order.find({}, { status: 1 }); // נביא רק את השדה status
        console.log("Orders statuses:", orders);

        const statuses = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        console.log("Grouped statuses:", statuses);
        return statuses;
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const validStatuses = ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status");
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    },
};
