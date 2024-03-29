import Link from "next/link";
import React from "react";
import { BiHome, BiMessageSquareDots } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { IoOptions } from "react-icons/io5";
import { UserButton, currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/libs/actions/user.actions";

type LeftSidebarProps = {};

const LeftSidebar: React.FC<LeftSidebarProps> = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  return (
    <div className="hidden md:flex flex-col sticky items-start gap-12 h-screen px-4 pt-48 left-0 top-0 bg-black z-10 text-white font-bold">
      <Link href="/" className="flex justify-center items-center gap-4 p-2">
        <BiHome size={25} className="text-white" />
        <p className="hidden lg:block">HOME</p>
      </Link>
      <Link
        href={`/profile/${userInfo?.id}`}
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
      <Link
        href="/preferences"
        className="flex justify-center items-center gap-4 p-2"
      >
        <IoOptions size={30} className="text-white" />
        <p className="hidden lg:block">PREFERENCES</p>
      </Link>
      <div className="flex justify-center items-center gap-4 p-2">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};
export default LeftSidebar;
