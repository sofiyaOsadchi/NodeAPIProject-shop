import { Schema } from "mongoose";
import { IImage } from "../../@types/@types";

const imageSchema = new Schema<IImage>({
  url: { type: String, minlength: 14, maxlength: 256 },

});

export default imageSchema;
