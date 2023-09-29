import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    sentBy: {type: String}, //userID or username?
    message: {type: String}
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;