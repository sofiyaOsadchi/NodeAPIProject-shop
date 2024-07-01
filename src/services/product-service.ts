import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";
import { Logger } from "../logs/logger";

const generateBizNumber = async () => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Product.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};

export const productService = {
  createProduct: async (data: IProductInput, userId: string) => {
    if (!data.size) {
      data.size = 'M';
    }
    //userId is extracted from the JWT
    const product = new Product(data);
    product.userId = userId;
    product.barcode = await generateBizNumber();

    Logger.log(product.barcode);

    return product.save();
  },

  getProducts: async () => Product.find(),

  getProduct: async (id: string) => Product.findById(id),

  getProductByUserId: async (userId: string) => Product.find({ userId: userId }),

  getProductById: async (id: string) => Product.findById(id),


  toggleShoppingCart: async (userId: string, productId: string) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const isFavorite = product.shoppingCart.includes(userId);
    if (isFavorite) {
      product.shoppingCart = product.shoppingCart.filter(fav => fav.toString() !== userId);
    } else {
      product.shoppingCart.push(userId);
    }
    await product.save();
    return product;
  },

  updateProduct: async (id: string, data: IProductInput, userId: string) => {
    const product = await Product.findOneAndUpdate({ _id: id, userId: userId }, data, { new: true });
    if (!product) throw new Error("Product not found or user unauthorized to update this product");
    return product;
  },

  deleteProduct: async (id: string, userId: string) => {
    const product = await Product.findOneAndDelete({ _id: id, $or: [{ userId: userId }, { isAdmin: true }] });
    if (!product) throw new Error("Product not found or user unauthorized to delete this product");
    return product;
  },
};



