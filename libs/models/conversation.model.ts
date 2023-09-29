import mongoose, { Schema } from "mongoose";
import Message from "./message.model";

const conversationSchema = new Schema({
    // conversationId: {type: String, unique: true},
    userIds: [{type: String, unique: true}],
    conversation: [{type: Message}]
});

const Converstaion = mongoose.models.Convseration || mongoose.model("Conversation", conversationSchema);

export default Converstaion;