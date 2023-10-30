"use server";
import { connectToDB } from "../mongoose";
import Conversation from "../models/conversation.model";

type params = {
  userId: string;
  recieverId: string;
  messageText?: string;
  username?: string;
  image?: string;
  recieverName?: string;
  recieverImage?: string;
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
  image,
  recieverName,
  messageText,
  recieverImage,
}: params) {
  try {
    const conversation = new Conversation({
      users: [
        { id: userId, username, image },
        { id: recieverId, username: recieverName, image: recieverImage },
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
  image,
  messageText,
  username,
  recieverName,
  recieverImage,
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
        image,
        recieverName,
        recieverId,
        recieverImage,
        messageText,
      });
      console.log("conversation created");
    }
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
