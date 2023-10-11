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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 w-64">
      <Link href={href}>
        <div className="w-full h-40 bg-red-800 bg-opacity-75 relative">
          <div className="absolute top-2 left-2">
            <p className="text-white text-lg font-semibold">{username}</p>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p className="font-bold text-lg text-gray-800">{username}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div>
          {!likedByUser ? (
            <AiOutlineHeart
              onClick={() => startTransition(() => handleLike(userId, likeId))}
              size={25}
              className="cursor-pointer text-red-500 hover:text-red-600"
            />
          ) : (
            <AiFillHeart
              onClick={() => startTransition(() => handleLike(userId, likeId))}
              size={25}
              className="text-red-500 hover:text-red-600"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
