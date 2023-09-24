"use client";
import { UserValidation } from "@/libs/validations/User";
import React, { useState } from "react";
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
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    await updateUser({
      userId: user.id,
      username: form.getValues("username"),
      bio: form.getValues("bio"),
      path: pathname,
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
          />
        </label>
        <label>
          Bio:
          <textarea
            {...form.register("bio")}
            name="bio"
            className="px-2 text-black ml-2"
            rows={10}
          />
        </label>
        <button type="submit">Edit Profile</button>
      </form>
    </>
  );
};
export default AccountProfile;
