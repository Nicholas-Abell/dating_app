import Message from "@/components/forms/Message";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  const profileInfo = await fetchUser(params.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="h-screen w-full relative flex flex-col justify-center items-center">
      <h1>{profileInfo?.username}</h1>
      <h1>{profileInfo?.age}</h1>
      <h1>{profileInfo?.bio}</h1>
      <h1>{profileInfo?.lookingfor}</h1>
      <div className="absolute w-full h-screen flex flex-col bottom-12 justify-end items-center">
        <Message
          userId={userInfo?.id}
          username={userInfo?.username}
          recieverId={profileInfo?.id}
          recieverName={profileInfo?.username}
        />
      </div>
    </section>
  );
}
export default Page;
