import { Schema } from "mongoose";
import { IUser } from "../../@types/@types";
import nameSchema from "./name-schema";
import addressSchema from "./address-schema";
import imageSchema from "./image-schema";
import { string } from "joi";
import { object } from "underscore";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
/*   image: { type: imageSchema, required: false },
  alt: { type: String, required: false }, */ 
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
    unique: true,
  },
  password: { type: String, required: true, minlength: 7, maxlength: 300 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },

  /* isBusiness: { required: true, type: Boolean }, */  

  createdAt: { type: Date, default: new Date(), required: false },
  isAdmin: { required: false, type: Boolean, default: false },
  /* cart: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    price: { type: Number },
    size: { type: String }
  }], */
});

export default userSchema;
