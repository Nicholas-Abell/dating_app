"use client";
import AccountProfile from "@/components/navbar/forms/AccountProfile";
import React from "react";
import { currentUser } from "@clerk/nextjs";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();

  //user clerk
  //userInfo MongoDb
  const userData = {
    id: user?.id,
    userName: userInfo?.username || user?.username,
    
  };

  return (
    <main className="flex flex-col justify-center">
      <h1>ON BOARDING</h1>
      <AccountProfile />
    </main>
  );
};
export default page;
