import React from "react";

type ProfileLoadingSkeletonProps = {};

const ProfileLoadingSkeleton: React.FC<ProfileLoadingSkeletonProps> = () => {
  return (
    <section className="w-full min-h-screen relative flex flex-col pb-24 items-center gap-4">
      <div className="w-full h-[80vh] bg-gray-300 animate-pulse" />
      <div className="w-full min-h-screen relative flex flex-col pt-12 pb-24 px-8 items-center gap-4">
        <div className="w-full flex items-center pt-8 gap-12 text-4xl">
          <div className="bg-gray-300 w-36 h-10 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-16 h-10 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-green-400 w-8 h-8 rounded-full animate-pulse" />
            <div className="bg-gray-300 w-24 h-6 animate-pulse rounded-lg"></div>
          </div>
          <div className="bg-gray-300 w-20 h-6 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-gray-300 w-6 h-6 animate-pulse rounded-full" />
            <div className="bg-gray-300 w-24 h-6 animate-pulse rounded-lg"></div>
          </div>
          <div className="bg-gray-300 w-12 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-28 h-6 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full flex flex-col py-8 gap-1">
          <div className="bg-gray-300 w-20 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-full h-32 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="bg-gray-300 w-20 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-28 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-16 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-32 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-28 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-20 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-32 h-6 animate-pulse rounded-lg"></div>
          <div className="bg-gray-300 w-24 h-6 animate-pulse rounded-lg"></div>
        </div>
        <div className="fixed w-full h-screen flex flex-col bottom-12 justify-end items-center">
          <div className="bg-yellow-500 text-2xl px-32 py-6 rounded-full max-w-[380px] opacity-40 hover:opacity-100 ease-in-out duration-200">
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLoadingSkeleton;
