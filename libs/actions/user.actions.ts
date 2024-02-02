"use server";

import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
// import { IPGeolocationAPI } from "../../node_modules/ip-geolocation-api-sdk-typescript/IPGeolocationAPI";
// import { GeolocationParams } from "ip-geolocation-api-sdk-typescript/GeolocationParams";

type Params = {
  userId: string;
  username: string;
  bio: string;
  path: string;
  age: number;
  feet: number;
  inches: Number;
  weight: number;
  relationshipstatus: string;
  lookingfor: string;
  gender: string;
  race: string;
  sexualOrientation: string;
  pets: string;
  kids: string;
  alcohol: string;
  smoking: string;
  marijuana: string;
  religion: string;
  politicalViews: string;
};

export async function updateUser({
  userId,
  username,
  bio,
  path,
  age,
  feet,
  inches,
  weight,
  relationshipstatus,
  lookingfor,
  gender,
  race,
  sexualOrientation,
  pets,
  kids,
  alcohol,
  smoking,
  marijuana,
  religion,
  politicalViews,
}: Params): Promise<void> {
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        bio,
        onboarded: true,
        age,
        height: { feet, inches },
        weight,
        relationshipstatus,
        lookingfor,
        gender,
        race,
        sexualOrientation,
        pets,
        kids,
        alcohol,
        smoking,
        marijuana,
        religion,
        politicalViews,
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
  pets: string[];
  kids: string[];
  orientation: string[];
  religion: string[];
  politicalViews: string[];
  smoking: string[];
  marijuana: string[];
  alcohol: string[];
  race: string[];
  sexualOrientation: string[];
  relationshipstatus: string[];
};

export async function updatePreferences({
  userId,
  gender,
  min,
  max,
  distance,
  desires,
  pets,
  kids,
  orientation,
  religion,
  politicalViews,
  smoking,
  marijuana,
  alcohol,
  race,
  sexualOrientation,
  relationshipstatus,
}: PreferenceParams) {
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        preferences: {
          preferencesSet: true,
          gender,
          age: { min, max },
          distance,
          desires,
          pets,
          kids,
          orientation,
          religion,
          politicalViews,
          smoking,
          marijuana,
          alcohol,
          race,
          sexualOrientation,
          relationshipstatus,
        },
      },
      { upsert: true }
    );
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function addUserImage(userId: string, imageUrl: string) {
  try {
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
    await User.findOneAndUpdate(
      { id: userId },
      { $pull: { images: imageUrl } }
    );
  } catch (error) {
    console.log("deleteUserImage Error: " && error);
  }
}

export async function fetchProfiles(
  userId: string,
  pageNumber = 1,
  pageSize = 20
) {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    connectToDB();
    console.log("Fetch All Profiles");

    const users = await User.aggregate([
      {
        $match: { id: { $ne: userId } }, // Exclude the user's own profile
      },
      { $skip: skipAmount },
      { $limit: pageSize },
    ]);

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    // Fetch the user
    const currentUser = await User.findOne({ id: userId });

    // Check if the formatted date is already in the array
    if (!currentUser.lastOn.includes(formattedDate)) {
      // Update Time Stamp for the user
      await User.findOneAndUpdate(
        { id: userId },
        { lastOn: formattedDate },
        { new: true }
      );
      console.log("lastOn set: ", formattedDate);
    }

    return users;
  } catch (error: any) {
    throw new Error("fetchProfiles Error: " + error.message);
  }
}

export async function fetchFilteredProfiles(
  userId: string,
  pageNumber = 1,
  pageSize = 20
) {
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    connectToDB();
    console.log("Fetch Filtered Profiles");

    const user = await User.findOne({ id: userId });
    const userPreferences = user?.preferences;

    let query = {
      id: { $ne: userId },
      gender: { $in: userPreferences?.gender },
      age: {
        $lte: userPreferences?.age?.max,
        $gte: userPreferences?.age?.min,
      },
      relationshipstatus: { $in: userPreferences?.relationshipstatus },
      sexualOrientation: { $in: userPreferences?.sexualOrientation },
      race: { $in: userPreferences?.race },
      pets: { $in: userPreferences?.pets },
      kids: { $in: userPreferences?.kids },
      alcohol: { $in: userPreferences?.alcohol },
      smoking: { $in: userPreferences?.smoking },
      marijuana: { $in: userPreferences?.marijuana },
      religion: { $in: userPreferences?.religion },
      politicalViews: { $in: userPreferences?.politicalViews },
      lookingfor: { $in: userPreferences?.desires },
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

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    // Fetch the user
    const currentUser = await User.findOne({ id: userId });

    // Check if the formatted date is already in the array
    if (!currentUser.lastOn.includes(formattedDate)) {
      // Update Time Stamp for the user
      await User.findOneAndUpdate(
        { id: userId },
        { lastOn: formattedDate },
        { new: true }
      );
      console.log("lastOn set: ", formattedDate);
    }

    return users;
  } catch (error: any) {
    console.error("Error in fetchProfiles: ", error);
    throw new Error("fetchUser Error");
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    console.log("Fetch user");
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error: any) {
    throw new Error("fetchUser Error: ", error);
  }
}

export async function likeProfile(userId: string, likeId: string) {
  try {
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
  } catch (error: any) {
    throw new Error(`likeUser Error: ${error.message}`);
  }
}

export async function findUsersThatLikedYou(likedBy: string[]) {
  try {
    const users = await User.find({ id: { $in: likedBy } });

    return users;
  } catch (error) {
    console.error("Error finding users by likedBy:", error);
    throw error;
  }
}

// export async function updateLocation(userId: string) {
//   try {
//     let ipgeolocationApi = new IPGeolocationAPI(
//       process.env.IP_GEOLOCATION_KEY,
//       false
//     );
//     let geolocationParams = new GeolocationParams();

//     ipgeolocationApi.getGeolocation(async (res) => {
//       console.log(res);
//       await User.findOneAndUpdate(
//         { id: userId },
//         {
//           location: {
//             city: res.city,
//             latitude: res.latitude,
//             longitude: res.longitude,
//           },
//         },
//         { upsert: true }
//       );
//     }, geolocationParams);
//   } catch (error) {
//     console.error("Error fetchAndUpdateUserLocation error: ", error);
//   }
// }

export async function togglePreferencesSet(userId: string): Promise<void> {
  try {
    const user = await User.findOne({ id: userId });
    const preferencesSet = user?.preferences.preferencesSet || false;

    await User.findOneAndUpdate(
      { id: userId },
      { "preferences.preferencesSet": !preferencesSet }
    );

    revalidatePath("/preferences");
  } catch (error: any) {
    throw new Error(`Failed to toggle preferencesSet: ${error.message}`);
  }
}
