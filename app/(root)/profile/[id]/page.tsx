import Message from "@/components/forms/Message";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { BsFillPersonFill, BsPersonHearts } from "react-icons/bs";
import { BiRuler } from "react-icons/bi";
import { FaTransgender } from "react-icons/fa";
import { PiGlobeStandBold } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/components/shared/ImageCarousel";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  const profileInfo = await fetchUser(params.id);
  console.log(profileInfo);

  return (
    <section className="w-full min-h-screen relative flex flex-col pb-24 items-center gap-4">
      {profileInfo.images[0] ? (
        <div className="w-full h-[80vh] relative">
          <ImageCarousel images={profileInfo?.images} />
          <div className="w-full h-[80vh] hidden md:grid grid-cols-2">
            {profileInfo.images.map((image: string, key: number) => (
              <div key={key} className="relative">
                <Image src={image} alt="pic" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[80vh] bg-emerald-800" />
      )}
      <div className="w-full min-h-screen relative flex flex-col pt-12 pb-24 px-8 items-center gap-4">
        <div className="w-full flex items-center pt-8 gap-12 text-4xl">
          <h1 className="font-bold uppercase">{profileInfo?.username}</h1>
          <h1>{profileInfo?.age}</h1>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="p-1 bg-green-400 rounded-full" />
            <p>Online Now</p>
          </div>
          <p>21m away</p>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-1">
            <BsFillPersonFill size={20} />
            <p>{profileInfo?.gender}</p>
          </div>
          <p>-</p>
          <p>{profileInfo?.lookingfor}</p>
        </div>
        <div className="w-full flex flex-col py-8 gap-1">
          <p className="font-bold">ABOUT ME</p>
          <div className="bg-gray-200 text-black border rounded-xl p-4 max-w-[620px]">
            <p>{profileInfo?.bio}</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">STATS</p>
          <div className="flex items-center gap-4">
            <BiRuler size={20} />
            <p>{`6'2"`}</p>
            <p>{profileInfo?.weight}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaTransgender size={20} />
            <p>{profileInfo?.gender} - he/him/his</p>
          </div>
          <div className="flex items-center gap-4">
            <PiGlobeStandBold size={20} />
            <p>{profileInfo?.race}</p>
          </div>
          <div className="flex items-center gap-4">
            <BsPersonHearts size={20} />
            <p>{profileInfo?.relationshipstatus}</p>
          </div>
        </div>
        <div className="fixed w-full h-screen flex flex-col bottom-12 justify-end items-center">
          {params.id === userInfo?.id ? (
            <Link
              href="/profile/edit"
              className="bg-yellow-500 text-2xl px-24 py-2 rounded-full max-w-[380px] opacity-40 hover:opacity-100 ease-in-out duration-200"
            >
              <p>Edit Profile</p>
            </Link>
          ) : (
            <Message
              userId={userInfo?.id}
              username={userInfo?.username}
              image={userInfo?.images[0]}
              recieverId={profileInfo?.id}
              recieverName={profileInfo?.username}
              recieverImage={profileInfo?.images[0]}
            />
          )}
        </div>
      </div>
    </section>
  );
}
export default Page;
