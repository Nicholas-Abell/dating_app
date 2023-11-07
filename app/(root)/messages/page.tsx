import LikedBy from "@/components/messages/LikedBy";
import Messages from "@/components/messages/Messages";
import NoMessages from "@/components/messages/NoMessages";
import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  const conversations = await populateConversations(userInfo?.id);

  return (
    <main className="w-full h-screen overflow-y-scroll scrollbar-hide">
      <h2 className="p-4 font-bold text-3xl">Likes you</h2>
      <LikedBy userId={userInfo?.id} />
      <h1 className="p-4 font-bold text-3xl">Messages</h1>
      {conversations.length > 0 ? (
        conversations.map((convo, key) => {
          const otherUser =
            convo?.users[0].username !== userInfo?.username
              ? convo?.users[0]
              : convo?.users[1];

          return (
            <Messages
              key={key}
              convo={convo}
              otherUser={otherUser}
              userInfo={userInfo}
            />
          );
        })
      ) : (
        <NoMessages />
      )}
    </main>
  );
};

export default page;
