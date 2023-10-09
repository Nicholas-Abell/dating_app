import Message from "@/components/forms/Message";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  const profileInfo = await fetchUser(params.id);
  console.log(profileInfo);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="w-full min-h-screen relative flex flex-col pt-12 pb-24 items-center gap-4">
      <div className="w-full h-[80vh] bg-emerald-800" />
      <div className="w-full flex items-center pt-8 px-8 gap-12 text-4xl">
        <h1 className="font-bold uppercase">{profileInfo?.username}</h1>
        <h1>{profileInfo?.age}</h1>
      </div>
      <div className="w-full flex items-center px-8 gap-4">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-green-400 rounded-full" />
          <p>Online Now</p>
        </div>
        <p>21m away</p>
      </div>
      <div className="w-full flex items-center px-8 gap-4">
        <div className="flex items-center gap-1">
          <BsFillPersonFill size={20} />
          <p>{profileInfo?.gender}</p>
        </div>
        <p>-</p>
        <p>{profileInfo?.lookingfor}</p>
      </div>
      <div className="w-full flex flex-col px-8 py-8 gap-1">
        <p>ABOUT ME</p>
        <div className="bg-gray-400 border rounded-xl p-4 max-w-[620px]">
          <p>
            {profileInfo?.bio} 
          </p>
        </div>
      </div>
      <div className="fixed w-full h-screen flex flex-col bottom-12 justify-end items-center">
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
