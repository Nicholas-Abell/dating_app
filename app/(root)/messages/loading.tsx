import LikedBySkeleton from "@/components/loadingSkeletons/LikedBySkeleton";
import MessageSkeleton from "@/components/loadingSkeletons/MessageSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
      <h2 className="p-4 font-bold text-3xl">Likes you</h2>
      <LikedBySkeleton />
      <h1 className="p-4 font-bold text-3xl">Messages</h1>
      <MessageSkeleton />
    </div>
  );
};
export default loading;
