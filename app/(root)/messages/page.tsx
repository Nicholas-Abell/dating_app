import NoMessages from "@/components/messages/NoMessages";
import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  const conversations = await populateConversations(userInfo?.id);

  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="p-4 font-bold text-3xl">Messages</h1>
      {conversations.length > 0 ? (
        conversations.map((convo) => (
          <Link
            href={`/messages/${convo?._id}`}
            key={convo.id}
            className="block border-b p-4 transition-transform transform hover:bg-slate-300 ease-in-out duration-200"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-red-800 rounded-full relative">
                <Image
                  fill
                  src={
                    convo?.users[0].username !== userInfo?.username
                      ? convo?.users[0].image
                      : convo?.users[1].image
                  }
                  className=" object-cover rounded-full"
                  alt="profile_img"
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold">
                  {convo?.users[0].username !== userInfo?.username
                    ? convo?.users[0].username
                    : convo?.users[1].username}
                </p>
                <p className="text-gray-600">
                  {convo?.message[convo?.message.length - 1]?.sentBy ===
                  userInfo?.username
                    ? "Received: " +
                      convo?.message[convo?.message.length - 1]?.content
                    : "Sent: " +
                      convo?.message[convo?.message.length - 1]?.content}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <NoMessages />
      )}
    </div>
  );
};

export default page;
