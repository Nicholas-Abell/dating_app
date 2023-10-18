import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type pageProps = {};

export default async function Edit() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user?.id,
    username: userInfo ? userInfo.username : user?.username,
    bio: userInfo?.bio || "",
    age: userInfo?.age || 0,
    height: userInfo?.height || 0,
    weight: userInfo?.weight || 0,
    lookingfor: userInfo?.lookingfor || "",
    gender: userInfo?.gender || user.gender || "",
    relationshipstatus: userInfo?.relationshipstatus || "",
    race: userInfo?.race || "",
    images: [userInfo?.images] || "",
  };

  return (
    <div className="w-full flex justify-center items-center overflow-y-scroll scrollbar-hide">
      <AccountProfile user={userData} />
    </div>
  );
}
