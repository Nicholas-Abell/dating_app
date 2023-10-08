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
    const conversation = await Conversation.findOne({ _id: conversationId });
    console.log("conversation fetched: " + conversation);
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
      "users.id": userId,
    });
    console.log(conversations);
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
    $and: [{ "users.id": userId }, { "users.id": recieverId }],
  });
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
    if (existingConversation) {
      await Conversation.findByIdAndUpdate(existingConversation._id, {
        $push: { message: { content: messageText, sentBy: username } },
      });
      console.log("message sent");
    } else {
      createConversation({
        username,
        userId,
        recieverName,
        recieverId,
        messageText,
      });
      console.log("conversation created");
    }
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
