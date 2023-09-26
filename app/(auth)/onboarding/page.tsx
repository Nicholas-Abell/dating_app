import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "@clerk/nextjs/server";

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
    username: userInfo?.username || user?.username,
    bio: userInfo?.bio || "",
    age: user?.age,
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <AccountProfile user={userData} />
    </main>
  );
};
export default page;
