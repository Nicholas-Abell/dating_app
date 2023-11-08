import PreferencesForm from "@/components/forms/PreferencesForm";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();

  const userInfo = await fetchUser(user.id);

  return (
    <main className="w-full">
      <PreferencesForm user={userInfo} />
    </main>
  );
};
export default page;
