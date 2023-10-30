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
    <section className="p-8 w-full">
      <h1 className="text-center text-4xl py-12">HOME</h1>
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
    </section>
  );
}
