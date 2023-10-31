import MessageSkeleton from "@/components/loadingSkeletons/MessageSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="p-4 font-bold text-3xl">Messages</h1>
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
    </div>
  );
};
export default loading;
