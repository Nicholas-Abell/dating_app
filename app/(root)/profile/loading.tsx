import React from "react";
import { BiRuler } from "react-icons/bi";
import { BsFillPersonFill, BsPersonHearts } from "react-icons/bs";
import { FaTransgender } from "react-icons/fa";
import { PiGlobeStandBold } from "react-icons/pi";

type loadingProps = {};

const loading: React.FC<loadingProps> = () => {
  return (
    <section className="w-full min-h-screen relative flex flex-col pb-24 items-center gap-4">
      {/* {imageCount ? (
    <div className="w-full h-[80vh] relative">
      <ImageCarousel images={profileInfo?.images} />
      <div
        className={`w-full h-full hidden md:grid grid-rows-1 grid-cols-3`}
      >
          <div key={key} className="relative h-full">
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-[80vh] bg-emerald-800" />
  )} */}
      <div className="w-full min-h-screen relative flex flex-col pt-12 pb-24 px-8 items-center gap-4">
        <div className="w-full flex items-center pt-8 gap-12 text-4xl">
          {/* <h1 className="font-bold uppercase">{profileInfo?.username}</h1> */}
          {/* <h1>{profileInfo?.age}</h1> */}
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
            {/* <p>{profileInfo?.gender}</p> */}
          </div>
          <p>-</p>
          {/* <p>{profileInfo?.lookingfor}</p> */}
        </div>
        <div className="w-full flex flex-col py-8 gap-1">
          <p className="font-bold">ABOUT ME</p>
          <div className="bg-gray-200 text-black border rounded-xl p-4 max-w-[620px]">
            {/* <p>{profileInfo?.bio}</p> */}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">STATS</p>
          <div className="flex items-center gap-4">
            <BiRuler size={20} />
            <p>{`6'2"`}</p>
            {/* <p>{profileInfo?.weight}</p> */}
          </div>
          <div className="flex items-center gap-4">
            <FaTransgender size={20} />
            {/* <p>{profileInfo?.gender} - he/him/his</p> */}
          </div>
          <div className="flex items-center gap-4">
            <PiGlobeStandBold size={20} />
            {/* <p>{profileInfo?.race}</p> */}
          </div>
          <div className="flex items-center gap-4">
            <BsPersonHearts size={20} />
            {/* <p>{profileInfo?.relationshipstatus}</p> */}
          </div>
        </div>
        <div className="fixed w-full h-screen flex flex-col bottom-12 justify-end items-center"></div>
      </div>
    </section>
  );
};
export default loading;
