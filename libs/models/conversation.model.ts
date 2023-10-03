import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
  conversationId: { type: String, unique: true },
  users: [{ id: String, username: String }],
  message: [
    {
      content: String,
      sentBy: String,
    },
  ],
});

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
