import { Schema } from "mongoose";
import { IProduct } from "../../@types/@types";
import addressSchema from "./address-schema";
import imageSchema from "./image-schema";

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, minlength: 2, maxlength: 256 },
  subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  price: { type: Number, required: true, minlength: 1, maxlength: 11 },
  
  image: { type: imageSchema, required: true },

  shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  quantity: { type: Number, required: true }, 
  sold: { type: Number, default: 0 },  

  createdAt: { type: Date, required: false, default: new Date() },
  userId: { type: String, required: true },
  barcode: { type: Number, required: true, min: 1_000_000, max: 9_999_999 },
});

export default productSchema;