import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="h-screen w-full relative flex flex-col justify-center items-center">
      <h1>{userInfo?.username}</h1>
      <h1>{userInfo?.age}</h1>
      <h1>{userInfo?.bio}</h1>
      <h1>{userInfo?.lookingfor}</h1>
      <button>Message</button>
      <div className="absolute w-full h-screen flex flex-col bottom-12 justify-end items-center">
        <form className="w-full max-w-[380px]">
          <input
            type="text"
            className="text-black p-4 placeholder:text-black w-full rounded-full"
            placeholder="...say something"
          />
        </form>
      </div>
    </section>
  );
}
export default Page;
