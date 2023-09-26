import { UserButton } from "@clerk/nextjs";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="w-full bg-black px-8 py-2 z-20 fixed top-0 left-0">
      <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  );
};
export default Navbar;
