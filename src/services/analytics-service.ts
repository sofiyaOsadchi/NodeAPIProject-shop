import Product from "../db/models/product-model";
import Order from "../db/models/order-model";
import { IOrderProduct } from "../@types/@types";
import BizCardsError from "../errors/BizCardsError";

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
        // הוספת יום אחד לתאריך הסיום כדי לכלול את כל היום הנוכחי
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const salesByDate = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // קיבוץ לפי יום
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
            {
                $sort: { _id: 1 }, // מיון לפי תאריך עולה
            },
        ]);

        const overallSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: null, // קיבוץ כל המסמכים יחד
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
        ]);

        return {
            salesByDate,
            overallSales: overallSales[0] || { totalAmount: 0, totalSales: 0 },
        };
    },

   /*  getTotalSold: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + product.sold, 0);
    }, */

    getTopSellingProducts: async () => {
        const products = await Product.find().sort({ sold: -1 }).limit(10);
        return products.map(product => ({
            title: product.title,
            sold: product.sold,
            price: product.price,
            totalRevenue: product.sold * product.price  // חישוב סך ההכנסות
        }));
    },

    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new BizCardsError(404, "Product not found");
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
            throw new BizCardsError(404, "Invalid status");
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new BizCardsError(404, "Order not found");
        }

        return order;
    },
};
