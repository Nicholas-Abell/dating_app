import Link from "next/link";
import Image from "next/image";
import React from "react";
import { findUsersThatLikedYou } from "@/libs/actions/user.actions";
import NoLikedBy from "./NoLikedBy";

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
            className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center"
          >
            <Image
              src={likedYou.images[0]}
              fill
              alt={likedYou.username.toString()}
              className="object-cover rounded-full"
            />
          </Link>
        ))
      ) : (
        <NoLikedBy />
      )}
    </aside>
  );
};
export default LikedBy;
