import { likeProfile } from "@/libs/actions/user.actions";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type LikeButtonProps = {
  userId: string;
  likeId: string;
  likedByUser: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  userId,
  likeId,
  likedByUser,
}) => {
  const handleLike = (userId: string, likeId: string) => {
    likeProfile(userId, likeId);
  };

  return (
    <>
      {!likedByUser ? (
        <AiOutlineHeart
          onClick={() => handleLike(userId, likeId)}
          size={25}
          className="cursor-pointer text-red-500 hover:text-red-600"
        />
      ) : (
        <AiFillHeart
          onClick={() => handleLike(userId, likeId)}
          size={25}
          className="cursor-pointer text-red-500 hover:text-red-600"
        />
      )}
    </>
  );
};
export default LikeButton;
