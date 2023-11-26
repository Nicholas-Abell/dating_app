import React from "react";
import { FaHeart } from "react-icons/fa";

type SpinnerProps = {
  size?: "small" | "medium" | "large"; // Define size options
};

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  // Map sizes to dimensions
  const sizeToDimensions = {
    small: "h-8 w-8", // Define dimensions for small size
    medium: "h-16 w-16", // Define dimensions for medium size (default)
    large: "h-24 w-24", // Define dimensions for large size
  };

  return (
    <div className="flex items-center justify-center relative">
      <div
        className={`animate-spin ease-in-out duration-[2s] z-10 rounded-full border-t-4 border-pink-400 ${sizeToDimensions[size]}`}
      ></div>
      <div
        className={`absolute bg-gray-100 rounded-full ${sizeToDimensions[size]}`}
      ></div>
      <FaHeart
        size={size === "small" ? 20 : size === "large" ? 40 : 30} // Adjust heart size based on variant
        className={`text-gray-400 animate-pulse absolute`}
      />
    </div>
  );
};

export default Spinner;
