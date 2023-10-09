import { fetchConversation } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page({ params }: { params: { conversationId: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  console.log("params:" + params.conversationId);
  const conversation = await fetchConversation(params?.conversationId);

  return (
    <section className="h-screen w-full gap-4 flex flex-col justify-center items-center pt-8 lg:px-48">
      {conversation?.message.map((mess: any) => (
        <div
          className={`border-2 border-white rounded-xl px-12 py-4 ${
            mess.sentBy === userInfo?.username
              ? " bg-green-400 mr-auto"
              : "bg-blue-400 ml-auto"
          }`}
          key={mess._id}
        >
          <p>{mess.content}</p>
        </div>
      ))}
    </section>
  );
}
export default Page;
