import PreferencesSkeleton from "@/components/loadingSkeletons/PreferencesSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return <PreferencesSkeleton />;
};
export default loading;
