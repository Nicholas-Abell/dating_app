import Link from "next/link";
import React from "react";
import { BiHome, BiMessageSquareDots } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";

type LeftSidebarProps = {};

const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  return (
    <div className="hidden md:flex flex-col sticky items-start gap-12 h-screen px-4 pt-48 left-0 top-0 bg-black z-10 text-white font-bold">
      <Link href="/" className="flex justify-center items-center gap-4 p-2">
        <BiHome size={25} className="text-white" />
        <p className="hidden lg:block">HOME</p>
      </Link>
      <Link
        href="/profile/edit"
        className="flex justify-center items-center gap-4 p-2"
      >
        <ImProfile size={25} className="text-white" />
        <p className="hidden lg:block">PROFILE</p>
      </Link>
      <Link
        href="/messages"
        className="flex justify-center items-center gap-4 p-2"
      >
        <BiMessageSquareDots size={30} className="text-white" />
        <p className="hidden lg:block">MESSAGES</p>
      </Link>
      <div className="flex justify-center items-center gap-4 p-2">
        <AiFillSetting size={30} className="text-white" />
        <p className="hidden lg:block">HOME</p>
      </div>
    </div>
  );
};
export default LeftSidebar;
