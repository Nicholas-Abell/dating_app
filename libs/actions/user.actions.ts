"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { IPGeolocationAPI } from "../../node_modules/ip-geolocation-api-sdk-typescript/IPGeolocationAPI";
import { GeolocationParams } from "ip-geolocation-api-sdk-typescript/GeolocationParams";
import calculateDistance from "@/utils/getDistance";

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
  race: string;
  sexualOrientation: string;
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
  race,
  sexualOrientation,
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
        race,
        sexualOrientation,
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

type PreferenceParams = {
  userId: string;
  gender: string[];
  min: number;
  max: number;
  distance: number;
  desires: string[];
};

export async function updatePreferences({
  userId,
  // path: string,
  gender,
  min,
  max,
  distance,
  desires,
}: PreferenceParams) {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        preferences: { gender, age: { min, max }, distance, desires },
      },
      { upsert: true }
    );
    // if (path === "/") {
    //   revalidatePath(path);
    // }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function addUserImage(userId: string, imageUrl: string) {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      { $push: { images: imageUrl } },
      { new: true }
    );
  } catch (error) {
    console.log("addUserImage Error: " && error);
  }
}

export async function deleteUserImage(userId: string, imageUrl: string) {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      { $pull: { images: imageUrl } }
    );
  } catch (error) {
    console.log("deleteUserImage Error: " && error);
  }
}

// export async function fetchProfiles(
//   userId: string,
//   pageNumber = 1,
//   pageSize = 20
// ) {
//   const skipAmount = (pageNumber - 1) * pageSize;

//   try {
//     connectToDB();
//     const users = await User.find({ id: { $ne: userId } })
//       .skip(skipAmount)
//       .limit(pageSize);
//     return users;
//   } catch (error: any) {
//     throw new Error("fetchUser Error: ", error);
//   }
// }

export async function fetchProfiles(
  userId: string,
  pageNumber = 1,
  pageSize = 20
) {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    // Connect to the database
    connectToDB();

    // Fetch the user's preferences
    const user = await User.findOne({ id: userId });
    const userPreferences = user?.preferences;

    const query = {
      id: { $ne: userId }, // Exclude the current user
      gender: { $in: userPreferences.gender },
      age: { $lte: userPreferences.age.max, $gte: userPreferences.age.min },
      // Add more conditions based on preferences if needed
    };

    const users = await User.aggregate([
      {
        $addFields: {
          distance: {
            $multiply: [
              {
                $sqrt: {
                  $sum: [
                    {
                      $pow: [
                        {
                          $subtract: [
                            "$location.longitude",
                            user?.location.longitude,
                          ],
                        },
                        2,
                      ],
                    },
                    {
                      $pow: [
                        {
                          $subtract: [
                            "$location.latitude",
                            user?.location.latitude,
                          ],
                        },
                        2,
                      ],
                    },
                  ],
                },
              },
              69, // Convert degrees to miles (approximate factor)
            ],
          },
        },
      },
      {
        $match: {
          $and: [query, { distance: { $lte: userPreferences.distance } }],
        },
      },
      { $skip: skipAmount },
      { $limit: pageSize },
    ]);

    revalidatePath("/");
    return users;
  } catch (error: any) {
    console.error("Error in fetchProfiles: ", error);
    throw new Error("fetchUser Error");
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

export async function likeProfile(userId: string, likeId: string) {
  try {
    connectToDB();

    const userToLike = await User.findOne({ id: likeId });
    console.log("Like/Disliked: ", userToLike?.username);
    const user = await User.findOne({ id: userId });

    if (!user.likes.includes(likeId)) {
      //add liked profile to user array
      await User.findOneAndUpdate(
        { id: userId },
        { $push: { likes: likeId } },
        { new: true }
      );
      //add likedBy to target profile
      await User.findOneAndUpdate(
        { id: likeId },
        { $push: { likedBy: userId } },
        { new: true }
      );
    } else {
      //remove liked profile from user array
      await User.findOneAndUpdate(
        { id: userId },
        { $pull: { likes: likeId } },
        { new: true }
      );
      //remove likedBy from target profile
      await User.findOneAndUpdate(
        { id: likeId },
        { $pull: { likedBy: userId } },
        { new: true }
      );
    }
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`likeUser Error: ${error.message}`);
  }
}

export async function findUsersThatLikedYou(userId: string) {
  try {
    connectToDB();
    const user = await fetchUser(userId);
    if (!user) {
      console.log("User not found.");
      return [];
    }
    const likedByUserIds = user.likedBy;

    const users = await User.find({ id: { $in: likedByUserIds } });

    console.log("Users liked by the user: ", users);
    return users;
  } catch (error) {
    console.error("Error finding users by likedBy:", error);
    throw error;
  }
}
export async function fetchAndUpdateUserLocation(userId: string) {
  try {
    connectToDB();
    let ipgeolocationApi = new IPGeolocationAPI(
      process.env.IP_GEOLOCATION_KEY,
      false
    );
    let geolocationParams = new GeolocationParams();

    ipgeolocationApi.getGeolocation(async (res) => {
      console.log(res);
      await User.findOneAndUpdate(
        { id: userId },
        {
          location: {
            city: res.city,
            latitude: res.latitude,
            longitude: res.longitude,
          },
        },
        { upsert: true }
      );
    }, geolocationParams);
  } catch (error) {
    console.error("Error fetchAndUpdateUserLocation error: ", error);
  }
}
