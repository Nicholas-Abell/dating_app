import PreferencesForm from "@/components/forms/PreferencesForm";
import PreferencesToggle from "@/components/shared/PreferencesToggle";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { PiShapesLight } from "react-icons/pi";

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
      preferencesSet: userInfo?.preferences?.preferencesSet,
      age: {
        min: userInfo?.preferences.age.min || 18,
        max: userInfo?.preferences.age.max || 100,
      },
      distance: userInfo?.preferences?.distance || 9000,
      relationshipstatus: userInfo?.preferences?.relationshipstatus || "",
      desires: userInfo?.preferences?.desires || "",
      gender: userInfo?.preferences?.gender || "",
      race: userInfo?.preferences?.race || "",
      sexualOrientation: userInfo?.preferences?.sexualOrientation || "",
      pets: userInfo?.preferences?.pets || "",
      kids: userInfo?.preferences?.kids || "",
      orientation: userInfo?.preferences?.orientation || "",
      religion: userInfo?.preferences?.religion || "",
      politicalViews: userInfo?.preferences?.politicalViews || "",
      smoking: userInfo?.preferences?.smoking || "",
      marijuana: userInfo?.preferences?.marijuana || "",
      alcohol: userInfo?.preferences?.alcohol || "",
    },
  };

  return (
    <main className="w-full">
      <div className="w-full">
        <PreferencesToggle
          id={userInfo?.id}
          preferencesSet={userInfo?.preferences?.preferencesSet}
        />
      </div>
      <PreferencesForm user={userData} />
    </main>
  );
};
export default page;
