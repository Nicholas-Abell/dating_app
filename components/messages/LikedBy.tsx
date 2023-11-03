import Link from "next/link";
import Image from "next/image";
import React from "react";
import User from "@/libs/models/user.model";
import { findUsersThatLikedYou } from "@/libs/actions/user.actions";

type LikedByProps = {
  userId: string;
};

const LikedBy: React.FC<LikedByProps> = async ({ userId }) => {
  const likedz = await findUsersThatLikedYou(userId);

  return (
    <div className="flex items-center justify-start overflow-x-scroll scrollbar-hide px-4 gap-8">
      {likedz.map((likedYou: any, key: number) => (
        <Link
          key={key}
          href={`/profile/${likedYou?.id}`}
          className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center"
        >
          <Image
            src={likedYou.images[0]}
            fill
            alt={likedYou.username.toString()}
            className="object-cover rounded-full"
          />
        </Link>
      ))}
    </div>
  );
};
export default LikedBy;
