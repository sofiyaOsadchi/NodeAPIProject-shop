import Joi from "joi";
import { IMessage } from "../@types/@types";
//req.body contains valid email and password
const joiMessageSchema = Joi.object<IMessage>({
    fullName: Joi.string().min(2).max(256).required(),
    email: Joi.string().email().min(5).max(20).required(),
    phone: Joi.string().min(9).max(15).required(),

    message: Joi.string().min(2).max(256).required(),
});

export default joiMessageSchema;