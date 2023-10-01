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

export async function checkExistingConvsersation(
  userId: string,
  recieverId: string
) {
  const existingConversation = await Conversation.findOne({
    users: { $all: [userId, recieverId] },
  });
  console.log("conversation found");
  return existingConversation;
}

//create conversation if there isn't one
export async function createConversation(userId: string, recieverId: string) {
  if (await checkExistingConvsersation(userId, recieverId)) return;
  try {
    const conversation = new Conversation({
      users: [userId, recieverId],
    });
    await conversation.save();
    console.log("conversation created");
  } catch (error: any) {
    console.log(`createConversation error: ${error.message}`);
  }
}

export async function sendMessage(
  userId: string,
  reciverId: string,
  messageText: string
) {
  try {
    const existingConversation = checkExistingConvsersation(userId, reciverId);
    if (!existingConversation) createConversation(userId, reciverId);
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
