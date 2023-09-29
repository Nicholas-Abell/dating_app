import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    sentBy: {type: String}, //userID
    message: {type: String}
});

const conversationSchema = new Schema({
    conversationId: {type: String, unique: true},
    userIds: [{type: String, unique: true}],
    conversation: [{type: messageSchema}]
});
