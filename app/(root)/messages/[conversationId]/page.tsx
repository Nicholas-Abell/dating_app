import { fetchConversation } from "@/libs/actions/message.actions";
import { currentUser } from "@clerk/nextjs";

async function Page({ params }: { params: { conversationId: string } }) {
  // const user = await currentUser();
  // if (!user) return null;

  // const userInfo = await fetchConversation(user?.id);
  console.log("params:" + params.conversationId);
  const conversation = await fetchConversation(params?.conversationId);

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center pt-8">
      {conversation?.message.map((mess: any) => (
        <p key={mess._id}>{mess.content}</p>
      ))}
    </section>
  );
}
export default Page;
