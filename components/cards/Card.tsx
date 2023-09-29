"use client";
import { likeUser } from "@/libs/actions/user.actions";
import Link from "next/link";
import React, { useTransition } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type CardsProps = {
  href: string;
  username: string;
  bio: string;
  userId: string;
  likeId: string;
  likedByUser: boolean;
};

const handleLike = (userId: string, likeId: string) => {
  likeUser(userId, likeId);
};

const Card: React.FC<CardsProps> = ({
  href,
  username,
  bio,
  userId,
  likeId,
  likedByUser,
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-gray-200 p-8 w-[320px] h-[320px]">
      <Link href={href}>
        <div className="w-full h-[70%] bg-red-800"></div>
      </Link>
      <p className="font-bold uppercase">{username}</p>
      <p>{bio}</p>

      {!likedByUser ? (
        <AiOutlineHeart
          onClick={() => startTransition(() => handleLike(userId, likeId))}
          size={25}
          className="z-10 hover:text-red-600 cursor-pointer"
        />
      ) : (
        <AiFillHeart
          onClick={() => startTransition(() => handleLike(userId, likeId))}
          size={25}
          className="z-10 hover:text-gray-600 text-red-600"
        />
      )}
    </div>
  );
};
export default Card;
