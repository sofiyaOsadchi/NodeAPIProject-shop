import Joi from "joi";
import { IProduct, IProductInput } from "../@types/@types";
import { imageSchema } from "./user-schema";

// סכמה עבור ווריאנטים
const variantSchema = Joi.object({
  size: Joi.string().valid("S", "M", "L", "XL", "XXL").required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().min(1).max(999_999).required(),
});

// סכמה עבור מוצר עם ווריאנטים
const productSchema = Joi.object<IProductInput>({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  image: imageSchema,
  alt: Joi.string().min(2).max(50).required(),
  variants: Joi.array().items(variantSchema).required(), // Array of variants
  
});

export default productSchema;
