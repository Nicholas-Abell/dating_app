"use server";
import { connectToDB } from "../mongoose";
import Conversation from "../models/conversation.model";
import { revalidatePath } from "next/cache";

type params = {
  userId: string;
  recieverId: string;
  content?: string;
  username?: string;
  image?: string;
  recieverName?: string;
  recieverImage?: string;
  path?: string;
  conversationId?: string;
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
  content,
  recieverImage,
}: params) {
  try {
    const conversation = new Conversation({
      users: [
        { id: userId, username, image },
        { id: recieverId, username: recieverName, image: recieverImage },
      ],
      message: { content, sentBy: username },
    });

    await conversation.save();
    console.log("conversation created");
  } catch (error: any) {
    console.log(`createConversation error: ${error.message}`);
  }
}

export async function populateConversations(userId: string) {
  try {
    const conversations = await Conversation.find({
      "users.id": userId,
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
    $and: [{ "users.id": userId }, { "users.id": recieverId }],
  });
  return existingConversation;
}

export async function sendMessage({
  userId,
  recieverId,
  image,
  content,
  username,
  recieverName,
  recieverImage,
}: params) {
  try {
    const existingConversation = await checkExistingConversation({
      userId,
      recieverId,
    });
    if (existingConversation) {
      await Conversation.findByIdAndUpdate(existingConversation._id, {
        $push: { message: { content, sentBy: username } },
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
        content,
      });
      console.log("conversation created");
      revalidatePath("/messages");
    }
  } catch (error: any) {
    console.log(`sendMessage error: ${error.message}`);
  }
}
