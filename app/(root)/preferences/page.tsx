import React from "react";
import { PiShapesLight } from "react-icons/pi";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <main className="w-full">
      <div className="bg-gray-400 wi-full px-4 flex justify-center items-center gap-4">
        <PiShapesLight size={50} />
        <h2>BASIC</h2>
      </div>
    </main>
  );
};
export default page;
