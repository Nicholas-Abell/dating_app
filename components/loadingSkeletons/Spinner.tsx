import React from "react";
import { FaHeart } from "react-icons/fa";

type SpinnerProps = {};

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="flex items-center justify-center relative">
      <div className="animate-spin ease-in-out duration-[2s] z-10 rounded-full h-16 w-16 border-t-4 border-pink-400"></div>
      <div className=" absolute bg-gray-100 rounded-full h-16 w-16"></div>
      <FaHeart size={30} className="text-gray-400 animate-pulse absolute" />
    </div>
  );
};
export default Spinner;
