"use client";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiShapesLight } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import { number } from "zod";

type PreferencesFormProps = {};

const PreferencesForm: React.FC<PreferencesFormProps> = () => {
  const [options, setOptions] = useState({
    gender: false,
    age: false,
    distance: false,
    desires: false,
    family: false,
    pets: false,
    hasKids: false,
    wantsKids: false,
  });

  const [selected, setSelected] = useState({
    gender: [""],
    age: { min: 18, max: 100 }, //slider?
    distance: 50, //max miles
    desires: [""],
  });

  return (
    <main className="w-full">
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <PiShapesLight size={50} />
        <p>BASIC</p>
      </div>
      <button
        onClick={() => setOptions({ ...options, gender: !options.gender })}
        className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100"
      >
        <p>Gender</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      {options.gender && <div>Gender</div>}
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Age</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Distance</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Desires</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <MdFamilyRestroom size={50} />
        <p>FAMILY</p>
      </div>
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Pets</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Has Kids</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
        <p>Wants Kids</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
    </main>
  );
};
export default PreferencesForm;
