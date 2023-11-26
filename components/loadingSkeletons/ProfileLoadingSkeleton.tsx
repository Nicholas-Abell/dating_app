import React from "react";
import Spinner from "./Spinner";

type ProfileLoadingSkeletonProps = {};

const ProfileLoadingSkeleton: React.FC<ProfileLoadingSkeletonProps> = () => {
  return (
    <div className="w-full justify-center h-screen flex items-center">
      <Spinner size="xl" />
    </div>
  );
};

export default ProfileLoadingSkeleton;
