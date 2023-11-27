import Message from "@/components/forms/Message";
import { fetchUser } from "@/libs/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ImageCarousel from "@/components/shared/ImageCarousel";
import calculateDistance from "@/utils/getDistance";
import {
  BsEye,
  BsFillPersonFill,
  BsPersonCircle,
  BsPersonHearts,
} from "react-icons/bs";
import { BiRuler } from "react-icons/bi";
import { FaTransgender } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiGlobeStandBold } from "react-icons/pi";
import LikeButton from "@/components/shared/LikeButton";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);
  const profileInfo = await fetchUser(params?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  let imageCount = profileInfo?.images?.length;

  let distance = calculateDistance(
    userInfo.location?.latitude,
    userInfo.location?.longitude,
    profileInfo.location?.latitude,
    profileInfo.location?.longitude
  );

  return (
    <section className="w-full min-h-screen relative flex flex-col pb-24 items-center gap-4">
      {/* Hero Mobile Start*/}
      <div className="md:hidden w-full h-[80vh] md:h-[40vh] relative">
        {imageCount ? (
          <ImageCarousel images={profileInfo?.images} />
        ) : (
          <div className="w-full h-[80vh] flex items-center justify-center bg-slate-600 bg-opacity-75 relative text-gray-200">
            <BsPersonCircle size={300} />
          </div>
        )}
      </div>
      {/* Hero End*/}

      {/* Hero Destop Start*/}
      <div
        className={`w-full hidden md:flex items-center gap-8 px-24 md:pt-12 bg-black relative`}
      >
        <div className="relative w-[180px] lg:w-[240px] h-[180px] lg:h-[240px] rounded-full">
          {imageCount ? (
            <Image
              src={profileInfo?.images[0]}
              alt="pic"
              fill
              className="object-cover object-center rounded-full z-10"
            />
          ) : (
            <div className="relative flex justify-center items-center z-10 w-[180px] lg:w-[240px] h-[180px] lg:h-[240px] rounded-full bg-slate-600">
              <BsPersonCircle size={80} className="text-gray-200" />
            </div>
          )}
        </div>
        <div className="flex flex-col text-white">
          <h2 className="font-bold uppercase text-4xl">
            {profileInfo?.username}
          </h2>
          <p>
            {profileInfo?.age} - {profileInfo?.location?.city}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 bg-white w-full h-12 p-4" />
      </div>
      {/* Hero Destop End*/}

      <div className="w-full relative flex flex-col pt-12 md:pt-0 pb-24 px-8 items-center gap-4">
        {/*Mobile Basic Info Start*/}
        <div className="md:hidden w-full">
          <div className="w-full flex items-center pt-8 gap-2 sm:gap-12 sm:text-4xl">
            <h2 className="font-bold uppercase">{profileInfo?.username}</h2>
            <p>{profileInfo?.age}</p>
          </div>
          <div className="w-full flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BsFillPersonFill size={20} />
              <p>
                {profileInfo?.gender} - {profileInfo?.sexualOrientation}
              </p>
            </div>
          </div>
        </div>
        {/*Mobile Basic Info End*/}

        {/* Stats/Bio Start */}
        <div className="grid md:grid-cols-2 gap-8 w-full">
          <div className="w-full flex flex-col py-8 md:py-0 gap-1 h-full">
            <p className="font-bold">ABOUT ME</p>
            <div className="bg-gray-200 text-black border rounded-xl p-4 max-w-[620px] min-h-[320px]">
              <p>{profileInfo?.bio}</p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between gap-4 px-4 pb-8 md:p-0">
            <p className="font-bold">STATS</p>
            <div className="flex items-center gap-4">
              <BiRuler size={20} />
              <p>
                {profileInfo?.height?.feet}
                <em className="text-xs">ft</em> {profileInfo?.height?.inches}
                <em className="text-xs">in</em>
              </p>
              <p>{profileInfo?.weight} lbs</p>
            </div>
            <div className="flex items-center gap-4">
              <FaTransgender size={20} />
              <p>
                {profileInfo?.gender} - {profileInfo?.sexualOrientation}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <PiGlobeStandBold size={20} />
              <p>{profileInfo?.race}</p>
            </div>
            <div className="flex items-center gap-4">
              <BsPersonHearts size={20} />
              <p>{profileInfo?.relationshipstatus}</p>
            </div>
            <div className="flex items-center gap-4">
              <BsEye size={20} />
              {profileInfo?.lookingfor}
            </div>
            <div className="flex items-center gap-4">
              <FaLocationDot size={20} />
              {distance}m away
            </div>
            <div className="flex items-center gap-4">
              <p>Last Seen: </p>
              {profileInfo?.lastOn}
            </div>
          </div>
        </div>
        {/* Stats/Bio End */}

        {/* Additional Info Start */}
        <div className="w-full bg-gray-200 grid md:grid-cols-3 grid-rows-1 md:min-h-[320px] gap-4 p-4 text-sm">
          <div className="rounded-xl bg-white gap-8 h-full border-black border-2 border-t-0">
            <div className="w-full text-center bg-black text-white rounded-tl-xl rounded-tr-xl">
              <h3>FAMILY</h3>
            </div>
            <div className="w-full px-4 py-2 flex flex-col gap-8">
              <p>Pets: {profileInfo?.pets}</p>
              <p>Kids: {profileInfo?.kids}</p>
              <p>-</p>
            </div>
          </div>
          <div className="rounded-xl bg-white gap-8 border-black border-2 border-t-0">
            <div className="w-full text-center bg-black text-white rounded-tl-xl rounded-tr-xl">
              <h3>LIFESTYLE</h3>
            </div>
            <div className="w-full px-4 py-2 flex flex-col gap-8">
              <p>Alcohol: {profileInfo?.alcohol}</p>
              <p>Smoking: {profileInfo?.smoking}</p>
              <p>Marijuana: {profileInfo?.marijuana}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white gap-8 border-black border-2 border-t-0">
            <div className="w-full text-center bg-black text-white rounded-tl-xl rounded-tr-xl">
              <h3>BACKGROUND</h3>
            </div>
            <div className="w-full px-4 py-2 flex flex-col gap-8">
              <p>Race: {profileInfo?.race}</p>
              <p>Religion: {profileInfo?.religion}</p>
              <p>Political Views: {profileInfo?.politicalViews}</p>
            </div>
          </div>
        </div>
        {/* Additional Info End */}

        {/* Desktop Images */}
        <div className="w-full bg-gray-200 hidden md:grid grid-cols-3 gap-4 p-4 relative">
          {profileInfo?.images &&
            profileInfo?.images.map((image: string, key: number) => (
              <div className="w-full min-h-[620px] relative" key={key}>
                <Image
                  src={image}
                  fill
                  alt={`image: ${key.toString()}`}
                  className="object-cover"
                />
              </div>
            ))}
        </div>
        {/* Desktop Images */}

        {params.id === userInfo?.id ? (
          <Link
            href="/profile/edit"
            className="fixed bottom-10 bg-yellow-500 text-2xl px-4 sm:px-24 py-2 rounded-full max-w-[380px] opacity-40 hover:opacity-100 ease-in-out duration-200"
          >
            <p>Edit Profile</p>
          </Link>
        ) : (
          <div className="w-full flex items-center justify-center fixed bottom-10 gap-4">
            <Message
              userId={userInfo?.id}
              username={userInfo?.username}
              image={userInfo?.images[0]}
              recieverId={profileInfo?.id}
              recieverName={profileInfo?.username}
              recieverImage={profileInfo?.images[0]}
            />
            <LikeButton
              userId={userInfo?.id}
              profileId={profileInfo?.id}
              likedByUser={userInfo?.likes.includes(profileInfo?.id)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
export default Page;
