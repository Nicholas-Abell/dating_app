import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
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
    <div className="w-full h-screen flex flex-col pt-24 items-center">
      {conversations ? (
        conversations.map((convo) => (
          <Link
            href={`/messages/${convo?._id}`}
            key={convo.id}
            className="w-full flex items-center hover:bg-gray-500 ease-in-out duration-200"
          >
            <div className="p-4">
              <div className="bg-red-800 p-24" />
            </div>
            <div className="border-b w-full h-full flex flex-col justify-center">
              <p>
                {convo?.users[0]?.username !== userInfo?.username
                  ? convo?.users[0]?.username
                  : ""}
                {convo?.users[1]?.username !== userInfo?.username
                  ? convo?.users[1]?.username
                  : ""}
              </p>
              <p className="font-bold">
                {convo?.message[convo?.message.length - 1]?.sentBy !==
                userInfo?.username
                  ? "recieved: " +
                    convo?.message[convo?.message.length - 1]?.content
                  : "sent: " +
                    convo?.message[convo?.message.length - 1]?.content}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <>no</>
      )}
    </div>
  );
};
export default page;
