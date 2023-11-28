import Link from "next/link";
import Image from "next/image";
import React from "react";
import { findUsersThatLikedYou } from "@/libs/actions/user.actions";
import NoLikedBy from "./NoLikedBy";
import { BsPersonCircle } from "react-icons/bs";

type LikedByProps = {
  likedBy: string[];
};

const LikedBy: React.FC<LikedByProps> = async ({ likedBy }) => {
  const likesYou = await findUsersThatLikedYou(likedBy);

  return (
    <aside className="flex items-center justify-start overflow-x-scroll scrollbar-hide px-4 gap-8">
      {likesYou ? (
        likesYou.map((likedYou: any, key: number) => (
          <Link
            key={key}
            href={`/profile/${likedYou?.id}`}
            className="flex flex-col justify-center items-center gap-1"
          >
            <div className="w-16 h-16 relative bg-slate-600 text-gray-200 rounded-full flex justify-center items-center">
              {likedYou.images[0] ? (
                <Image
                  src={likedYou.images[0]}
                  fill
                  alt={likedYou.username.toString()}
                  className="object-cover rounded-full"
                />
              ) : (
                <BsPersonCircle size={30} />
              )}
            </div>
            <p className="text-sm font-bold">{likedYou.username}</p>
          </Link>
        ))
      ) : (
        <NoLikedBy />
      )}
    </aside>
  );
};
export default LikedBy;
