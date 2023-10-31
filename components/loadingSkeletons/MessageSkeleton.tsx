import React from "react";

type MessageSkeletonProps = {};

const MessageSkeleton: React.FC<MessageSkeletonProps> = () => {
  return (
    <div className="block border-b p-4 transition-transform transform hover:bg-slate-300 ease-in-out duration-200">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-slate-600 text-gray-200 rounded-full relative flex justify-center items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>{" "}
        </div>
        <div className="ml-4">
          <div className="text-lg font-semibold mb-2 w-32 h-4 bg-gray-300 animate-pulse"></div>{" "}
          <div className="text-gray-600 w-48 h-4 bg-gray-300 animate-pulse"></div>{" "}
        </div>
      </div>
    </div>
  );
};
export default MessageSkeleton;
