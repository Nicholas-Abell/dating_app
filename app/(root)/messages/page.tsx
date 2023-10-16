import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  console.log("id: ", userInfo.id);
  const conversations = await populateConversations(userInfo?.id);
  console.log(conversations);

  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="p-4 font-bold text-3xl">Messages</h1>
      <div>
        {conversations.length > 0 ? (
          conversations.map((convo) => (
            <Link
              href={`/messages/${convo?._id}`}
              key={convo.id}
              className="block border-b p-4 transition-transform transform hover:bg-slate-300 ease-in-out duration-200"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-red-800 rounded-full"></div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">
                    {convo?.users[0].username !== userInfo?.username &&
                      convo?.users[0].username}
                    {convo?.users[1].username !== userInfo?.username &&
                      convo?.users[1].username}
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
          <div className="text-center p-4 text-gray-600">No messages</div>
        )}
      </div>
    </div>
  );
};

export default page;
