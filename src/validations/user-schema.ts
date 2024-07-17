import Joi, { alt } from "joi";
import { passwordRegex, phoneRegex } from "./patterns";
import { IAddress, IImage, IName, IUpdateUserType, IUser } from "../@types/@types";

const addressSchema = Joi.object<IAddress>({
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  houseNumber: Joi.number(),
  street: Joi.string().min(2).max(50).required(),
  zip: Joi.string().min(2).max(10).required(),
  state: Joi.string().min(2).max(50),
});

const imageSchema = Joi.object<IImage>({
  url: Joi.string().uri(),
});

const userSchema = Joi.object<IUser>({
 /*  isBusiness: Joi.boolean().required(), */
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  //address
  address: addressSchema.required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().min(0),
    last: Joi.string().min(2).max(50).required(),
  }).required(),
 /*  image: imageSchema,
  alt: Joi.string().min(2).max(50), */
});

const updateUserSchema = Joi.object<IUpdateUserType>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50),
    middle: Joi.string().min(0),
    last: Joi.string().min(2).max(50),
  }),
  phone: Joi.string().pattern(phoneRegex),
/*   image: imageSchema,
alt: Joi.string().min(2).max(50), */
  address: addressSchema,
});

export default userSchema;

export { addressSchema, imageSchema, userSchema, updateUserSchema };
