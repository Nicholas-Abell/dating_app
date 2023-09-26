"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

type Params = {
    userId: string,
    username: string,
    bio: string,
    path: string
}

export async function updateUser({userId, username, bio, path}: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId}, 
            {username: username.toLowerCase(), bio, onboarded: true}, 
            {upsert: true}
            );
    
            if(path === '/profile/edit'){
                revalidatePath(path)
            }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
} 

export async function populateUsers(){
    try {
        connectToDB();
        const users = await User.find({})
        return users;
    } catch (error: any) {
        throw new Error('fetchUser Error: ', error)
    }
}

export async function fetchUser(userId: string): Promise<void> {
    try {
        connectToDB();
        const user = await User.findOne({id: userId});
        return user;
    } catch (error: any) {
        throw new Error('fetchUser Error: ', error)
    }
}

