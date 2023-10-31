import React from "react";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h2>...Loading</h2>
    </div>
  );
};
export default loading;
