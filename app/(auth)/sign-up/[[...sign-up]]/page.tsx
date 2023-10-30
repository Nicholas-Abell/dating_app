import { SignUp } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <SignUp />;
    </main>
  );
};
export default page;
