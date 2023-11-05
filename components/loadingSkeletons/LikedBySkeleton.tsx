import React from "react";

type LikedBySkeletonProps = {};

const LikedBySkeleton: React.FC<LikedBySkeletonProps> = () => {
  return (
    <div className="flex items-center justify-start overflow-x-scroll scrollbar-hide px-4 gap-8">
      <div className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
export default LikedBySkeleton;
