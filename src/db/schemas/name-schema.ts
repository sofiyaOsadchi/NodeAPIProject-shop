import { Schema } from "mongoose";
import { IName } from "../../@types/@types";

const nameSchema = new Schema<IName>({
  first: { type: String, required: true, minlength: 2, maxlength: 20 },
  middle: {
    type: String,
    required: false,
    default: "",
    minlength: 0,
    maxlength: 20,
  },
  last: { type: String, required: true, minlength: 2, maxlength: 20 },
});

export default nameSchema;
