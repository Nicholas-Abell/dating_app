import React from "react";
import { FaHeart } from "react-icons/fa";

type SpinnerProps = {
  size?: "small" | "medium" | "large" | "xl";
};

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  // Map sizes to dimensions
  const sizeToDimensions = {
    small: "h-8 w-8",
    medium: "h-16 w-16",
    large: "h-24 w-24",
    xl: "h-48 w-48",
  };

  const heartSize =
    size === "small" ? 20 : size === "medium" ? 30 : size === "xl" ? 80 : 40;

  return (
    <div className="flex items-center justify-center relative">
      <div
        className={`animate-spin ease-in-out duration-[2s] z-10 rounded-full border-t-4 border-pink-400 ${sizeToDimensions[size]}`}
      ></div>
      <div
        className={`absolute bg-gray-100 rounded-full ${sizeToDimensions[size]}`}
      ></div>
      <FaHeart
        size={heartSize}
        className="text-gray-400 animate-pulse absolute"
      />
    </div>
  );
};

export default Spinner;
