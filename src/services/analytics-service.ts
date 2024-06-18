import Product from "../db/models/product-model";

export const analyticsService = {
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            title: product.title,
            quantity: product.quantity,
            sold: product.sold,
        }));
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
};
