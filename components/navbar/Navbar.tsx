import { UserButton } from "@clerk/nextjs";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="w-full flex justify-between items-center px-12 gap-4 bg-black py-2 z-20 fixed top-0 left-0">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex justify-center items-center gap-4">
        <div className="text-gray-300 px-4 border-2 border-gray-300 font-semibold text-xl rounded-full">
          <p>Age</p>
        </div>
        <div className="text-gray-300 px-4 border-2 border-gray-300 font-semibold text-xl rounded-full">
          <p>Gender</p>
        </div>
        <div className="text-gray-300 px-4 border-2 border-gray-300 font-semibold text-xl rounded-full">
          <p>Distance</p>
        </div>
        <div className="text-gray-300 px-4 border-2 border-gray-300 font-semibold text-xl rounded-full">
          <p>Online Now</p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
