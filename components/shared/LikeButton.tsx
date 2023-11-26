"use client";
import { likeProfile } from "@/libs/actions/user.actions";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type LikeButtonProps = {
  userId: string;
  profileId: string;
  likedByUser: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  userId,
  profileId,
  likedByUser,
}) => {
  const [loading, setLoading] = useState(false);
  const handleLike = async (userId: string, likeId: string) => {
    try {
      setLoading(!loading);
      await likeProfile(userId, likeId);
    } catch (error: any) {
      console.log("handleLike Error: ", error.message);
    }
  };

  return (
    <>
      {!likedByUser ? (
        loading ? (
          <AiFillHeart
            onClick={() => handleLike(userId, profileId)}
            size={25}
            className="cursor-pointer text-red-500 hover:text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={() => handleLike(userId, profileId)}
            size={25}
            className="cursor-pointer text-red-500 hover:text-red-600"
          />
        )
      ) : loading ? (
        <AiOutlineHeart
          onClick={() => handleLike(userId, profileId)}
          size={25}
          className="cursor-pointer text-red-500 hover:text-red-600"
        />
      ) : (
        <AiFillHeart
          onClick={() => handleLike(userId, profileId)}
          size={25}
          className="cursor-pointer text-red-500 hover:text-red-600"
        />
      )}
    </>
  );
};
export default LikeButton;
