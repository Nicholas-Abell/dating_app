import mongoose, { Schema } from "mongoose";
import Message from "./message.model";
import { type } from "os";

const conversationSchema = new Schema({
  conversationId: { type: String, unique: true },
  users: [{ type: String }],
  conversation: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
