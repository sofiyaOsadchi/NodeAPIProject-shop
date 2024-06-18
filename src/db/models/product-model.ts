import mongoose from "mongoose";
import productSchema from "../schemas/product-schema";

const Product = mongoose.model("Product", productSchema);

export default Product;