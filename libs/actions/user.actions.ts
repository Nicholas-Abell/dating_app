"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
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