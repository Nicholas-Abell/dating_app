import { SignIn } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </main>
  );
};
export default page;
