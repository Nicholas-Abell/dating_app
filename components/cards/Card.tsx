"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

import LikeButton from "../shared/LikeButton";

type CardsProps = {
  href: string;
  username: string;
  gender: string;
  userId: string;
  profileId: string;
  likedByUser: boolean;
  age: number;
  image?: string;
  sexualOrientation: string;
};

const Card: React.FC<CardsProps> = ({
  href,
  userId,
  profileId,
  likedByUser,
  username,
  age,
  gender,
  image,
  sexualOrientation,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:scale-105 ease-in-out duration-300">
      <Link href={href}>
        {image ? (
          <div className="w-full h-[280px] bg-gray-400 bg-opacity-75 relative">
            <Image
              src={image}
              alt={`${username} pic`}
              fill
              className=" object-cover"
            />
          </div>
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
            profileId={profileId}
            likedByUser={likedByUser}
          />
        </div>
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <p>
            {gender} - {age}
          </p>
          <p>{sexualOrientation}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
