import productSchema from "../../validations/product-schema";
import loginSchema from "../../validations/login-schema";
import userSchema, { updateUserSchema } from "../../validations/user-schema";
import { validateSchema } from "./validate-schema";

export const validateUser = validateSchema(userSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateProduct = validateSchema(productSchema);
export const validateUpdateUser = validateSchema(updateUserSchema);
/* export const validateMessage = validateSchema(joiMessageSchema);
 */