import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  console.log("id: ", userInfo._id);
  const conversations = await populateConversations(userInfo?.id);
  console.log(conversations);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {conversations.map((convo) => (
        <>c</>
      ))}
    </div>
  );
};
export default page;
