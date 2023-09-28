import { fetchUser, populateUsers } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  let profiles = await populateUsers(user.id);

  return (
    <section className="px-8">
      <h1 className="text-center text-4xl py-12">HOME</h1>
      <div className="flex flex-wrap gap-4">
        {profiles?.map((profile) => (
          <Link
            href={`/profile/${profile.id}`}
            key={profile.id}
            className="bg-gray-200 p-8 w-[320px] h-[320px]"
          >
            <div className="w-full h-[70%] bg-red-800"></div>
            <p className="font-bold uppercase">{profile.username}</p>
            <p>{profile.bio}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
