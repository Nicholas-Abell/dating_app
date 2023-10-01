import Card from "@/components/cards/Card";
import { fetchUser, populateUsers } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  let profiles = await populateUsers(user.id);

  const checkLikedProfiles = (userId: string) => {
    if (userInfo?.likes?.includes(userId)) {
      return true;
    } else return false;
  };

  return (
    <section className="px-8">
      <h1 className="text-center text-4xl py-12">HOME</h1>
      <div className="flex flex-wrap gap-4">
        {profiles?.map((profile) => (
          <Card
            key={profile.id}
            href={`/profile/${profile.id}`}
            username={profile.username}
            bio={profile.bio}
            userId={user.id}
            likeId={profile.id}
            likedByUser={checkLikedProfiles(profile.id)}
          />
        ))}
      </div>
    </section>
  );
}
