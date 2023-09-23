import AccountProfile from "@/components/navbar/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

type pageProps = {};

const page: React.FC<pageProps> = async () => {
  const user = await currentUser();
  const userInfo = {};

  //user clerk
  //userInfo MongoDb
  const userData = {
    id: user?.id,
    username: userInfo?.username || user?.username,
    bio: userInfo?.bio || "",
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <AccountProfile user={userData} />
    </main>
  );
};
export default page;
