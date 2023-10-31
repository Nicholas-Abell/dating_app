import ProfileLoadingSkeleton from "@/components/loadingSkeletons/ProfileLoadingSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return <ProfileLoadingSkeleton />;
};
export default loading;
