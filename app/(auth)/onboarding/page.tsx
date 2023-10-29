import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/libs/actions/user.actions";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user?.id);
  // if (userInfo?.onboarded) redirect(/);

  //user clerk
  //userInfo MongoDb

  const userData = {
    id: user?.id,
    username: userInfo ? userInfo.username : user?.username,
    bio: userInfo?.bio || "",
    age: userInfo?.age || 0,
    height: userInfo?.height || 0,
    weight: userInfo?.weight || 0,
    lookingfor: userInfo?.lookingfor || "",
    gender: userInfo?.gender || user.gender || "",
    race: userInfo?.race || "",
    relationshipstatus: userInfo?.relationshipstatus || "",
  };

  return (
    <main className="w-full flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide bg-gradient-to-r from-black to-purple-500 text-white rounded-lg p-8 shadow-lg mx-auto">
      <AccountProfile user={userData} />
    </main>
  );
};
export default page;
