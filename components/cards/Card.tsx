"use client";
import { likeUser } from "@/libs/actions/user.actions";
import Link from "next/link";
import React, { useTransition } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Image from "next/image";

type CardsProps = {
  href: string;
  username: string;
  gender: string;
  userId: string;
  likeId: string;
  likedByUser: boolean;
  age: number;
  image?: string;
};

const handleLike = (userId: string, likeId: string) => {
  likeUser(userId, likeId);
};

const Card: React.FC<CardsProps> = ({
  href,
  userId,
  likeId,
  likedByUser,
  username,
  age,
  gender,
  image,
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:scale-105 ease-in-out duration-300">
      <Link href={href}>
        {image ? (
          <>
            <Image src={image} alt={`${username} pic`} width={20} height={20} />
          </>
        ) : (
          <div className="w-full h-40 bg-red-800 bg-opacity-75 relative"></div>
        )}
      </Link>
      <div className="px-4 pt-1">
        <div className="flex justify-between">
          <p className="font-bold text-lg text-gray-800">{username}</p>
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
        <p className="text-gray-600 text-sm">
          {gender} - {age}
        </p>
      </div>
    </div>
  );
};

export default Card;
