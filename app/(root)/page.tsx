import Card from "@/components/cards/Card";
import PaginationBar from "@/components/navbar/PaginationBar";
import { fetchUser, fetchProfiles } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = await currentUser();

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  let profiles = await fetchProfiles(
    user.id,
    searchParams.page ? +searchParams.page : 1,
    21
  );

  const checkLikedProfiles = (userId: string) => {
    if (userInfo?.likes?.includes(userId)) {
      return true;
    } else return false;
  };

  return (
    <section className="px-8 pb-4 w-full min-h-screen flex justify-between flex-col">
      <h1 className="text-4xl py-12">HOME</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles?.map((profile) => (
          <Card
            key={profile.id}
            href={`/profile/${profile.id}`}
            username={profile.username}
            gender={profile.gender}
            age={profile.age}
            userId={user.id}
            likeId={profile.id}
            likedByUser={checkLikedProfiles(profile.id)}
            image={profile.images[0]}
          />
        ))}
      </div>
      <PaginationBar page={searchParams.page} />
    </section>
  );
}
