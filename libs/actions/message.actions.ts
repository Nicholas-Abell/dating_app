"use server";
import { connectToDB } from "../mongoose";
import Conversation from "../models/conversation.model";

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
export async function createConversation(
  userId: string,
  recieverId: string,
  messageText: string
) {
  try {
    const conversation = new Conversation({
      users: [userId, recieverId],
      message: { content: messageText, sentBy: userId },
    });

    await conversation.save();
    const conversationID = conversation._id;
    console.log("conversation created");
  } catch (error: any) {
    console.log(`createConversation error: ${error.message}`);
  }
}

export async function checkExistingConversation(
  userId: string,
  recieverId: string
) {
  const existingConversation = await Conversation.findOne({
    users: { $all: [userId, recieverId] },
  });
  console.log("conversation found");
  return existingConversation;
}

export async function sendMessage(
  userId: string,
  recieverId: string,
  messageText: string
) {
  try {
    connectToDB();
    const existingConversation = await checkExistingConversation(
      userId,
      recieverId
    );
    const conversationId = existingConversation?._id;
    if (existingConversation) {
      await Conversation.findOneAndUpdate(
        { id: conversationId },
        { $push: { message: { content: messageText, sentBy: userId } } }
      );
    } else {
      createConversation(userId, recieverId, messageText);
    }
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
