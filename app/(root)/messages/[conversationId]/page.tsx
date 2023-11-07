import { fetchConversation } from "@/libs/actions/message.actions";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { PiKeyReturnBold } from "react-icons/pi";

async function Page({ params }: { params: { conversationId: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  const conversation = await fetchConversation(params?.conversationId);
  const otherUser = conversation?.users.find(
    (user: any) => user.username !== userInfo?.username
  );
  const otherUserInfo = await fetchUser(otherUser?.id);

  return (
    <section className="h-screen w-full gap-4 flex flex-col items-center pt-8 px-12 lg:px-48 overflow-y-scroll scrollbar-hide">
      {conversation?.message.map((mess: any) => {
        return mess.sentBy === userInfo?.username ? (
          <div key={mess._id} className="px-8 relative ml-auto">
            <div className="border-2 border-black rounded-xl px-12 py-4 bg-blue-300">
              {mess.content}
            </div>
          </div>
        ) : (
          <div key={mess._id} className="px-8 relative mr-auto">
            <div className="border-2 border-black rounded-xl px-12 py-4 bg-green-300">
              {mess.content}
              <Link
                href={`/profile/${otherUser.id}`}
                className="absolute bottom-0 left-0 w-6 h-6 rounded-s-full"
              >
                <Image
                  fill
                  src={otherUserInfo.images[0]}
                  alt={otherUser.username}
                  className="object-fill rounded-full"
                />
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
export default Page;
