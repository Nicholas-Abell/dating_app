import { populateConversations } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
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
    <div className="w-full h-screen flex justify-center items-center">
      {conversations ? (
        conversations.map((convo) => (
          <>
            {convo?.users[0]?.username}
            <br />
            {convo?.users[1]?.username}
          </>
        ))
      ) : (
        <>no</>
      )}
    </div>
  );
};
export default page;
