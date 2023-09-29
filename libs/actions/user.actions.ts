"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type Params = {
  userId: string;
  username: string;
  bio: string;
  path: string;
  age: number;
  height: number;
  weight: number;
  relationshipstatus: string;
  lookingfor: string;
  gender: string;
  likes: [string]
};

export async function updateUser({
  userId,
  username,
  bio,
  path,
  age,
  height,
  weight,
  relationshipstatus,
  lookingfor,
  gender,
  likes
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        bio,
        onboarded: true,
        age,
        height,
        weight,
        relationshipstatus,
        lookingfor,
        gender,
        likes
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function populateUsers(userId: string) {
  try {
    connectToDB();
    const users = await User.find({id: {$ne: userId}});
    return users;
  } catch (error: any) {
    throw new Error("fetchUser Error: ", error);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error: any) {
    throw new Error("fetchUser Error: ", error);
  }
}

export async function likeUser(userId: string, likeId: string){
 try {
  connectToDB();

      const userToLike = await User.findOne({ id: likeId });
      console.log('User to Like:', userToLike);

      const user = await User.findOne({ id: userId });
      console.log('User', user);

      if(!user.likes.includes(likeId)){
        await User.findOneAndUpdate(
          {id: userId}, 
          { $push: { likes: likeId } }, 
          {upsert: true}
        );
      } else {
        await User.findOneAndUpdate(
          {id: userId}, 
          { $pull: { likes: likeId } }, 
          {upsert: true}
        );
      }
      revalidatePath("/");

 } catch (error: any) {
  throw new Error("likeUser Error: ", error);
 } 
}  
