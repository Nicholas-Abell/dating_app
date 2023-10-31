import React from "react";

type CardSkeletonProps = {};

const CardSkeleton: React.FC<CardSkeletonProps> = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full mx-auto">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-[280px] w-full mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
        <div className="bg-gray-300 h-4 w-3/4"></div>
      </div>
    </div>
  );
};
export default CardSkeleton;
