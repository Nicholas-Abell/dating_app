import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="h-screen w-full bg-green-800 flex flex-col justify-center items-center">
      <h1>{userInfo?.username}</h1>
      <h1>{userInfo?.age}</h1>
      <h1>{userInfo?.bio}</h1>
      <h1>{userInfo?.lookingfor}</h1>
    </section>
  );
}
export default Page;
