import { Schema } from "mongoose";
import { IProduct, IVariant } from "../../@types/@types";


const VariantSchema = new Schema<IVariant>({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new Schema<IProduct>({
  barcode: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  shoppingCart: [{ type: String }],
  sold: { type: Number, required: false, default: 0 },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    url: { type: String, required: true },
  },
  alt: { type: String, required: true },
  variants: [VariantSchema], // Array of embedded documents
});

export default ProductSchema;