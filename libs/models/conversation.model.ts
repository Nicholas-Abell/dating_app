import mongoose, { Schema } from "mongoose";
import Message from "./message.model";

const conversationSchema = new Schema({
  conversationId: { type: String, unique: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  conversation: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
