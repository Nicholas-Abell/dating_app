"use client";
import { UserValidation } from "@/libs/validations/User";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUser } from "@/libs/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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
  };
};

const AccountProfile: React.FC<AccountProfileProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: "",
      bio: "",
      age: 0,
      height: 0,
      weight: 0,
      relationshipstatus: "",
      lookingfor: "",
      gender: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    await updateUser({
      userId: user.id,
      username: values.username, //values.username
      bio: values.bio, //values.bio
      path: pathname,
      age: values.age,
      height: values.height,
      weight: values.weight,
      relationshipstatus: values.relationshipstatus,
      lookingfor: values.lookingfor,
      gender: values.gender,
    });

    console.log("user updated");

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-slate-800 rounded-lg p-4 text-white"
      >
        <label>
          Username:
          <input
            {...form.register("username")}
            type="text"
            name="username"
            className="px-2 text-black ml-2"
            placeholder={user?.username}
          />
        </label>
        <label>
          Bio:
          <textarea
            {...form.register("bio")}
            name="bio"
            className="px-2 text-black ml-2"
            rows={10}
            placeholder={user?.bio}
          />
        </label>
        {/* <label>
          Age:
          <input
            type="number"
            {...form.register("age")}
            name="age"
            className="px-2 text-black ml-2"
            placeholder={user?.age.toString()}
          />
        </label>
        <label>
          height:
          <input
            type="number"
            {...form.register("height")}
            name="height"
            className="px-2 text-black ml-2"
            placeholder={user?.height.toString()}
          />
        </label>
        <label>
          weight:
          <input
            type="number"
            {...form.register("weight")}
            name="weight"
            className="px-2 text-black ml-2"
          />
        </label> */}
        <label>
          realtionship status:
          <input
            type="text"
            {...form.register("relationshipstatus")}
            name="relationshipstatus"
            className="px-2 text-black ml-2"
            placeholder={user?.relationshipstatus}
          />
        </label>
        <label>
          lookingfor:
          <input
            type="text"
            {...form.register("lookingfor")}
            name="lookingfor"
            className="px-2 text-black ml-2"
            placeholder={user?.lookingfor}
          />
        </label>
        <label>
          gender:
          <input
            type="text"
            {...form.register("gender")}
            name="gender"
            className="px-2 text-black ml-2"
            placeholder={user?.gender}
          />
        </label>
        <button type="submit">Edit Profile</button>
      </form>
      {user?.bio}
    </>
  );
};
export default AccountProfile;
