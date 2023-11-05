import HomeSkeleton from "@/components/loadingSkeletons/HomeSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return <HomeSkeleton />;
};
export default loading;
