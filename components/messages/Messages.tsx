import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";

type User = {
  image: string;
  username: string;
};

type Message = {
  sentBy: string;
  content: string;
};

type MessagesProps = {
  convo: { _id: string; id: string; users: User[]; message: Message[] };
  otherUser: User;
  userInfo: User;
};

const Messages: React.FC<MessagesProps> = ({ convo, otherUser, userInfo }) => {
  return (
    <Link
      href={`/messages/${convo._id}`}
      key={convo.id}
      className="block border-b p-4 transition-transform transform hover:bg-slate-300 ease-in-out duration-200"
    >
      <div className="flex items-center">
        <div className="w-24 h-24 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center">
          {otherUser.image ? (
            <Image
              fill
              src={
                convo?.users[0].username !== userInfo?.username
                  ? convo?.users[0].image
                  : convo?.users[1].image
              }
              className="object-cover rounded-full"
              alt="profile_img"
            />
          ) : (
            <BsPersonCircle size={40} />
          )}
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold">{otherUser.username}</p>
          <p className="text-gray-600">
            {convo?.message[convo?.message.length - 1]?.sentBy ===
            userInfo?.username
              ? "Sent: " + convo?.message[convo?.message.length - 1]?.content
              : "Received: " +
                convo?.message[convo?.message.length - 1]?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Messages;
