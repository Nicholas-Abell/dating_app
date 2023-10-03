"use server";
import { connectToDB } from "../mongoose";
import Conversation from "../models/conversation.model";

type params = {
  userId: string;
  recieverId: string;
  messageText?: string;
  username?: string;
  recieverName?: string;
};

export async function fetchConversation(conversationId: string) {
  try {
    connectToDB();
    const conversation = await Conversation.findOne({ id: conversationId });
    return conversation;
  } catch (error: any) {
    throw new Error("fetchConversation Error: ", error);
  }
}

//create conversation if there isn't one
export async function createConversation({
  userId,
  recieverId,
  username,
  recieverName,
  messageText,
}: params) {
  try {
    const conversation = new Conversation({
      users: [
        { id: userId, username: username },
        { id: recieverId, username: recieverName },
      ],
      message: { content: messageText, sentBy: userId },
    });

    await conversation.save();
    console.log("conversation created");
  } catch (error: any) {
    console.log(`createConversation error: ${error.message}`);
  }
}

export async function populateConversations(userId: string) {
  try {
    connectToDB();
    const conversations = await Conversation.find({
      users: { $all: [userId] },
    });
    return conversations;
  } catch (error: any) {
    throw new Error("populateConversations Error: ", error);
  }
}

export async function checkExistingConversation({
  userId,
  recieverId,
}: params) {
  const existingConversation = await Conversation.findOne({
    users: { $all: [userId, recieverId] },
  });
  console.log("conversation found");
  return existingConversation;
}

export async function sendMessage({
  userId,
  recieverId,
  messageText,
  username,
  recieverName,
}: params) {
  try {
    connectToDB();
    const existingConversation = await checkExistingConversation({
      userId,
      recieverId,
    });
    const conversationId = existingConversation?._id;
    if (existingConversation) {
      await Conversation.findOneAndUpdate(
        { id: conversationId },
        { $push: { message: { content: messageText, sentBy: userId } } }
      );
    } else {
      createConversation({
        username,
        userId,
        recieverName,
        recieverId,
        messageText,
      });
    }
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
