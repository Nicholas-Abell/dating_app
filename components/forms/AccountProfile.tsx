"use client";
import { UserValidation } from "@/libs/validations/User";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  updateLocation,
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
    feet: number;
    inches: number;
    weight: number;
    relationshipstatus: string;
    lookingfor: string;
    gender: string;
    race: string;
    sexualOrientation: string;
    // pronouns: string;
    pets: string;
    kids: string;
    alcohol: string;
    smoking: string;
    marijuana: string;
    religion: string;
    politicalViews: string;
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
      feet: user?.feet || 0,
      inches: user?.inches || 0,
      weight: user?.weight || 0,
      relationshipstatus: user?.relationshipstatus || "",
      lookingfor: user?.lookingfor || "",
      gender: user?.gender || "",
      race: user?.race || "",
      sexualOrientation: user?.sexualOrientation || "",
      pets: user?.pets || "",
      kids: user?.kids || "",
      alcohol: user?.alcohol || "",
      smoking: user?.smoking || "",
      marijuana: user?.marijuana || "",
      religion: user?.religion || "",
      politicalViews: user?.politicalViews || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log("Form values before submission:", values);

    await updateUser({
      userId: user.id,
      username: values.username,
      bio: values.bio,
      path: pathname,
      age: values.age,
      feet: values.feet,
      inches: values.inches,
      weight: values.weight,
      relationshipstatus: values.relationshipstatus,
      lookingfor: values.lookingfor,
      gender: values.gender,
      race: values.race,
      sexualOrientation: values.sexualOrientation,
      pets: values.pets,
      kids: values.kids,
      alcohol: values.alcohol,
      smoking: values.smoking,
      marijuana: values.marijuana,
      religion: values.religion,
      politicalViews: values.politicalViews,
    });

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
            placeholder={user?.age?.toString()}
          />
        </div>

        <div>
          <label htmlFor="height" className="font-bold px-2">
            Height
          </label>
          <div className="flex items-center bg-white">
            <p>feet</p>
            <input
              type="number"
              {...form.register("feet")}
              name="feet"
              id="feet"
              className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={user?.feet?.toString()}
            />
            <p>inches</p>
            <input
              type="number"
              {...form.register("inches")}
              name="inches"
              id="inches"
              className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={user?.inches?.toString()}
            />
          </div>
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
            placeholder={user?.weight?.toString()}
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
            {userOptions.enumRelationshipstatus.map((status) => (
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

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Pets
          </label>
          <select
            {...form.register("pets")}
            name="pets"
            id="pets"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumPets.map((pet) => (
              <option key={pet} value={pet}>
                {pet}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Kids
          </label>
          <select
            {...form.register("kids")}
            name="kids"
            id="kids"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumKids.map((kid) => (
              <option key={kid} value={kid}>
                {kid}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Alcohol
          </label>
          <select
            {...form.register("alcohol")}
            name="alcohol"
            id="alcohol"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumAlcohol.map((alc) => (
              <option key={alc} value={alc}>
                {alc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Smoking
          </label>
          <select
            {...form.register("smoking")}
            name="smoking"
            id="smoking"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumSmoking.map((smoking) => (
              <option key={smoking} value={smoking}>
                {smoking}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="font-bold px-2">
            Marijuana
          </label>
          <select
            {...form.register("marijuana")}
            name="marijuana"
            id="marijuana"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumMarijuana.map((marryj) => (
              <option key={marryj} value={marryj}>
                {marryj}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="religion" className="font-bold px-2">
            Religion
          </label>
          <select
            {...form.register("religion")}
            name="religion"
            id="religion"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumReligion.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="politicalViews" className="font-bold px-2">
            Political Views
          </label>
          <select
            {...form.register("politicalViews")}
            name="politicalViews"
            id="politicalViews"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {userOptions.enumPoliticalViews.map((politicalViews) => (
              <option key={politicalViews} value={politicalViews}>
                {politicalViews}
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
