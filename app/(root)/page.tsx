import { populateUsers } from "@/libs/actions/user.actions";

export default async function Home() {
  let profiles = await populateUsers();

  return (
    <section className="px-8">
      <h1 className="text-center text-4xl py-12">HOME</h1>
      <div className="flex flex-wrap gap-4">
        {profiles?.map((profile) => (
          <div key={profile.id} className="bg-gray-200 p-8 w-[320px] h-[320px]">
            <div className="w-full h-[70%] bg-red-800"></div>
            <p className="font-bold uppercase">{profile.username}</p>
            <p>{profile.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
