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

  const profilePerPage = 20;

  let profiles = await fetchProfiles(
    user.id,
    searchParams.page ? +searchParams.page : 1,
    profilePerPage
  );

  return (
    <section className="px-8 pb-4 w-full min-h-screen flex justify-between flex-col overflow-y-scroll">
      <h1 className="text-4xl py-12">HOME</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles?.map((profileInfo) => (
          <Card
            key={profileInfo?.id}
            href={`/profile/${profileInfo?.id}`}
            username={profileInfo?.username}
            gender={profileInfo?.gender}
            age={profileInfo?.age}
            userId={userInfo?.id}
            profileId={profileInfo?.id}
            likedByUser={userInfo?.likes.includes(profileInfo?.id)}
            image={profileInfo?.images[0]}
          />
        ))}
      </div>
      <PaginationBar
        page={searchParams.page}
        profileCount={profiles.length}
        profilePerPage={profilePerPage}
      />
    </section>
  );
}
