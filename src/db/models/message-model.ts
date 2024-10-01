import mongoose from "mongoose";
import MessageSchema from "../schemas/message-schema";

const Message = mongoose.model("Message", MessageSchema);

export default Message;


