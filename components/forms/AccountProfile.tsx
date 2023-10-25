"use client";
import { UserValidation } from "@/libs/validations/User";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUser } from "@/libs/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { AccountPhotos } from "./AccountPhotos";

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
      images: "",
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
      likes: [""],
      race: values.race,
      images: [values.images],
    });

    console.log("user updated");

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const enumRelationshipStatus = [
    "No Response",
    "Committed",
    "Dating",
    "Engaged",
    "Exclusive",
    "Married",
    "Open Relationship",
    "Partnered",
    "Single",
  ];

  const enumLookingFor = [
    "Chat",
    "Dates",
    "Friends",
    "Hookups",
    "Relationship",
  ];

  const enumGender = [
    "Man",
    "Cis Man",
    "Trans Man",
    "Woman",
    "Cis Woman",
    "Trans Woman",
    "Non-Binary",
  ];

  const enumRace = [
    "White",
    "Black or African American",
    "Asian",
    "Hispanic or Latino",
    "Native American or American Indian",
    "Pacific Islander",
    "Middle Eastern or Arab",
    "Indigenous Peoples",
    "Multiracial",
    "Biracial",
    "South Asian",
    "East Asian",
    "Southeast Asian",
    "Central Asian",
    "North African",
    "Afro-Caribbean",
    "Afro-Latino",
    "European",
    "Jewish",
    "Roma or Romani",
    "Inuit",
    "Maori",
    "Aboriginal Australian",
    "First Nations",
    "Other Indigenous Groups",
    "Other/Mixed Race",
    "Prefer Not to Say",
    "Other",
  ];

  return (
    <section className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block text-white font-medium">
            Username
          </label>
          <input
            {...form.register("username")}
            type="text"
            name="username"
            id="username"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
            placeholder={user?.username}
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-white font-medium">
            Bio
          </label>
          <textarea
            {...form.register("bio")}
            name="bio"
            id="bio"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
            rows={5}
            placeholder={user?.bio}
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-white font-medium">
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
          <label htmlFor="height" className="block text-white font-medium">
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
          <label htmlFor="weight" className="block text-white font-medium">
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
          <label
            htmlFor="relationshipstatus"
            className="block text-white font-medium"
          >
            Relationship Status
          </label>
          <select
            {...form.register("relationshipstatus")}
            name="relationshipstatus"
            id="relationshipstatus"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
          >
            {enumRelationshipStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lookingfor" className="block text-white font-medium">
            Looking For
          </label>
          <select
            {...form.register("lookingfor")}
            name="lookingfor"
            id="lookingfor"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
          >
            {enumLookingFor.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block text-white font-medium">
            Gender
          </label>
          <select
            {...form.register("gender")}
            name="gender"
            id="gender"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
          >
            {enumGender.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="race" className="block text-white font-medium">
            Race/Ethnicity
          </label>
          <select
            {...form.register("race")}
            name="race"
            id="race"
            className="text-black w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
          >
            {enumRace.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 bg-pink-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};
export default AccountProfile;
