"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Conversation from "../models/conversation.model";
import mongoose from "mongoose";

export async function fetchConversation(conversationId: string) {
  try {
    connectToDB();
    const conversation = await Conversation.findOne({ id: conversationId });
    return conversation;
  } catch (error: any) {
    throw new Error("fetchUser Error: ", error);
  }
}

//create conversation if there isn't one
export async function updateConversation(
  conversationId: string,
  users: [string]
) {
  try {
    Conversation.findByIdAndUpdate({ id: conversationId }, { users: [users] });
  } catch (error) {}
}
//update conversation
