import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  sentBy: { type: mongoose.Types.ObjectId, ref: "User" },
  message: { type: String },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
