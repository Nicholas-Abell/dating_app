import PreferencesForm from "@/components/forms/PreferencesForm";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: userInfo?.id,
    sexualOrientation: userInfo?.sexualOrientation || "",
    gender: userInfo?.gender || "",
    preferences: {
      age: {
        min: userInfo?.preferences.age.min || 18,
        max: userInfo?.preferences.age.max || 100,
      },
      distance: userInfo?.preferences?.distance || 9000,
      relationshipstatus: userInfo?.preferences?.relationShipStatus || "",
      desires: userInfo?.preferences?.desires || "",
      gender: userInfo?.preferences?.gender || "",
      race: userInfo?.preferences?.race || "",
      sexualOrientation: userInfo?.preferences?.sexualOrientation || "",
    },
  };

  return (
    <main className="w-full">
      <PreferencesForm user={userData} />
    </main>
  );
};
export default page;
