import { populateUsers } from "@/libs/actions/user.actions";

export default async function Home() {
  let profiles = await populateUsers();

  return (
    <main className="px-8">
      <h1 className="text-center text-4xl">HOME</h1>
      <div className="flex flex-wrap gap-4">
        {profiles?.map((profile) => (
          <>{profile.username}</>
        ))}
      </div>
    </main>
  );
}
