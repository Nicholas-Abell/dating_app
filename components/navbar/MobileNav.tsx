import Link from "next/link";
import React from "react";
import { BiHome, BiMessageSquareDots } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { IoOptions } from "react-icons/io5";
import { UserButton, currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/libs/actions/user.actions";

type MobileNavProps = {};

const MobileNav: React.FC<MobileNavProps> = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);

  return (
    <div className="flex md:hidden sticky items-center justify-between px-8 left-0 top-0 bg-black h-10 z-10 text-white font-bold">
      <Link href="/" className="flex justify-center items-center p-2">
        <BiHome size={25} className="text-white" />
      </Link>
      <Link
        href={`/profile/${userInfo?.id}`}
        className="flex justify-center items-center p-2"
      >
        <ImProfile size={25} className="text-white" />
      </Link>
      <Link href="/messages" className="flex justify-center items-center p-2">
        <BiMessageSquareDots size={30} className="text-white" />
      </Link>
      <Link
        href="/preferences"
        className="flex justify-center items-center p-2"
      >
        <IoOptions size={30} className="text-white" />
      </Link>
      <div className="flex justify-center items-center">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};
export default MobileNav;
