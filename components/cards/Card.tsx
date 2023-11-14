"use client";
import { likeProfile } from "@/libs/actions/user.actions";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import LikeButton from "../shared/LikeButton";

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
  likeProfile(userId, likeId);
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
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:scale-105 ease-in-out duration-300">
      <Link href={href}>
        {image ? (
          <>
            <div className="w-full h-[280px] bg-gray-400 bg-opacity-75 relative">
              <Image
                src={image}
                alt={`${username} pic`}
                fill
                className=" object-cover"
              />
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center h-[280px] bg-slate-600 bg-opacity-75 relative text-gray-200">
            <BsPersonCircle size={200} />
          </div>
        )}
      </Link>
      <div className="px-4 pt-1">
        <div className="flex justify-between">
          <p className="font-bold text-lg text-gray-800">{username}</p>
          <LikeButton
            userId={userId}
            likeId={likeId}
            likedByUser={likedByUser}
          />
        </div>
        <p className="text-gray-600 text-sm">
          {gender} - {age}
        </p>
      </div>
    </div>
  );
};

export default Card;
