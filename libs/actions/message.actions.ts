"use server";
import { revalidatePath } from "next/cache";
// import User from "../models/user.model";
//import message Schema
import { connectToDB } from "../mongoose";

// export async function fetchUser(userId: string) {
//     try {
//       connectToDB();
//       const user = await Conversation.findOne({ id: conversationId });
//       return user;
//     } catch (error: any) {
//       throw new Error("fetchUser Error: ", error);
//     }
//   }