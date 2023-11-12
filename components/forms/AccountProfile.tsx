"use client";
import { UserValidation } from "@/libs/validations/User";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  fetchAndUpdateUserLocation,
  updateUser,
} from "@/libs/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import * as userOptions from "../../constants/userOptions";

type AccountProfileProps = {
  user: {
    id: string;
    username: string;
    bio: string;
    age: number;
    height: number;
    weight: number;
    relationshipstatus: string;
    lookingfor: string;
    gender: string;
    race: string;
    sexualOrientation: string;
  };
};

const AccountProfile: React.FC<AccountProfileProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user?.username || "",
      bio: user?.bio || "",
      age: user?.age || 0,
      height: user?.height || 0,
      weight: user?.weight || 0,
      relationshipstatus: user?.relationshipstatus || "",
      lookingfor: user?.lookingfor || "",
      gender: user?.gender || "",
      race: user?.race || "",
      sexualOrientation: user?.sexualOrientation || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    await updateUser({
      userId: user.id,
      username: values.username,
      bio: values.bio,
      path: pathname,
      age: values.age,
      height: values.height,
      weight: values.weight,
      relationshipstatus: values.relationshipstatus,
      lookingfor: values.lookingfor,
      gender: values.gender,
      race: values.race,
      sexualOrientation: values.sexualOrientation,
    });

    await fetchAndUpdateUserLocation(user.id);

    console.log("user updated");

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <section className="w-full bg-gray-400">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="font-bold px-2">
            Username
          </label>
          <input
            {...form.register("username")}
            type="text"
            name="username"
            id="username"
            className="text-black w-full px-4 py-2 rounded-lg focus:outline-none hover:border-blue-200 focus:border-blue-500"
            placeholder={user?.username}
          />
        </div>

        <div>
          <label htmlFor="bio" className="font-bold px-2">
            Bio
          </label>
          <textarea
            {...form.register("bio")}
            name="bio"
            id="bio"
            className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none hover:border-blue-200 focus:border-blue-500"
            rows={5}
            placeholder={user?.bio}
          />
        </div>

        <div>
          <label htmlFor="age" className="font-bold px-2">
            Age
          </label>
          <input
            type="number"
            {...form.register("age")}
            name="age"
            id="age"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={user?.age.toString()}
          />
        </div>

        <div>
          <label htmlFor="height" className="font-bold px-2">
            Height
          </label>
          <input
            type="number"
            {...form.register("height")}
            name="height"
            id="height"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={user?.height.toString()}
          />
        </div>

        <div>
          <label htmlFor="weight" className="font-bold px-2">
            Weight
          </label>
          <input
            type="number"
            {...form.register("weight")}
            name="weight"
            id="weight"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={user?.weight.toString()}
          />
        </div>

        <div>
          <label htmlFor="relationshipstatus" className="font-bold px-2">
            Relationship Status
          </label>
          <select
            {...form.register("relationshipstatus")}
            name="relationshipstatus"
            id="relationshipstatus"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumRelationshipStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sexualOrientation" className="font-bold px-2">
            Sexual Orientation
          </label>
          <select
            {...form.register("sexualOrientation")}
            name="sexualOrientation"
            id="sexualOrientation"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumSexualOrientation.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lookingfor" className="font-bold px-2">
            Looking For
          </label>
          <select
            {...form.register("lookingfor")}
            name="lookingfor"
            id="lookingfor"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumLookingFor.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="font-bold px-2">
            Gender
          </label>
          <select
            {...form.register("gender")}
            name="gender"
            id="gender"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumGender.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Race/Ethnicity
          </label>
          <select
            {...form.register("race")}
            name="race"
            id="race"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumRace.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full bg-white">
          <button
            type="submit"
            className="mt-6 bg-pink-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};
export default AccountProfile;
