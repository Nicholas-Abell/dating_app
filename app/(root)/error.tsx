"use client";
import React from "react";
import { FaHeartBroken } from "react-icons/fa";

type errorProps = {};

const error: React.FC<errorProps> = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-gray-300 gap-4">
      <FaHeartBroken size={60} />
      <p>Oops! Something went wrong. Please try again later.</p>
    </div>
  );
};
export default error;
