import CardSkeleton from "@/components/loadingSkeletons/CardSkeleton";
import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return (
    <section className="p-8 w-full">
      <h1 className="text-center text-4xl py-12">HOME</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  );
};
export default loading;
