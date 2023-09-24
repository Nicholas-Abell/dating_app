"use client";
import { UserValidation } from "@/libs/validations/User";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type AccountProfileProps = {
  user: {
    id: string;
    username: string;
    bio: string;
  };
};

const AccountProfile: React.FC<AccountProfileProps> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      id: "",
      username: "",
      bio: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UserValidation>) => {};

  return (
    <form className="flex flex-col gap-4 bg-slate-800 rounded-lg p-4 text-white">
      <label>
        Username:
        <input
          type="text"
          name="username"
          placeholder={user.username}
          className="px-2 text-black ml-2"
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          placeholder={user.bio}
          className="px-2 text-black ml-2"
          rows={10}
        />
      </label>
      <button type="submit">Edit Profile</button>
    </form>
  );
};
export default AccountProfile;
