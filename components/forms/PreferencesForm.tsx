"use client";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiShapesLight } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import * as userOptions from "../../utils/userOptions";
import { GrRadialSelected, GrRadial } from "react-icons/gr";
import { userInfo } from "os";

type PreferencesFormProps = {
  user: {
    preferences?: {
      age: { min: number; max: number };
      distance: number;
      relationshipstatus: string;
      lookingfor: string;
      gender: string;
      race: string;
      sexualOrientation: string;
    };
  };
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ user }) => {
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

  type Preferences = {
    gender: string[];
    age: number;
    desires: string[];
    distance: number;
  };

  type Selected = {
    [key in keyof Preferences]: Preferences[key];
  };

  const toggleSelected = <T extends keyof Preferences>(
    fieldName: T,
    value: Preferences[T] | string
  ) => {
    setSelected((prevSelected) => {
      const fieldSelected = prevSelected[fieldName] as Preferences[T];

      if (Array.isArray(fieldSelected)) {
        // For fields with array values (e.g., 'gender'), toggle selections
        if (fieldSelected.includes(value as string)) {
          // If the value is already selected, remove it
          return {
            ...prevSelected,
            [fieldName]: fieldSelected.filter((item) => item !== value),
          };
        } else {
          // If the value is not selected, add it
          return {
            ...prevSelected,
            [fieldName]: [...fieldSelected, value as string],
          };
        }
      } else {
        // Handle other field types (e.g., number) as needed
        return {
          ...prevSelected,
          [fieldName]: value,
        };
      }
    });
  };

  return (
    <main className="w-full">
      {selected.gender}
      {selected.desires}
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
      {options.gender && (
        <div className="flex flex-col gap-2 px-12 py-4">
          {userOptions.enumGender.map((gender, key) => (
            <div key={key}>
              <button
                onClick={() => toggleSelected("gender", gender)}
                className="flex items-center gap-4"
              >
                {selected.gender.includes(gender) ? (
                  <GrRadialSelected size={20} />
                ) : (
                  <GrRadial size={20} />
                )}
                {gender}
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setOptions({ ...options, age: !options.age })}
        className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100"
      >
        <p>Age</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      {options.age && (
        <div className="flex flex-col gap-2 px-12 py-4">
          <div className="flex items-center gap-4">
            <label htmlFor="min">
              min
              <input
                type="number"
                // {...form.register("age")}
                name="min"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age.min.toString() || "18"}
                min={18}
              />
            </label>
            <label htmlFor="max">
              max
              <input
                type="number"
                // {...form.register("age")}
                name="max"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age.max.toString() || "100"}
                min={18}
              />
            </label>
          </div>
        </div>
      )}
      <button
        onClick={() => setOptions({ ...options, distance: !options.distance })}
        className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100"
      >
        <p>Distance</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      {options.distance && (
        <div className="flex flex-col gap-2 px-12 py-4">
          <div className="flex items-center gap-4">
            <label htmlFor="distance" className="font-bold px-2">
              within:
            </label>
            <input
              type="number"
              // {...form.register("distance")}
              name="dietance"
              className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={user?.preferences?.distance.toString()}
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOptions({ ...options, desires: !options.desires })}
        className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100"
      >
        <p>Desires</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      {options.desires && (
        <div className="flex flex-col gap-2 px-12 py-4">
          {userOptions.enumLookingFor.map((desires, key) => (
            <div key={key}>
              <button
                onClick={() => toggleSelected("desires", desires)}
                className="flex items-center gap-4"
              >
                {selected.desires.includes(desires) ? (
                  <GrRadialSelected size={20} />
                ) : (
                  <GrRadial size={20} />
                )}
                {desires}
              </button>
            </div>
          ))}
        </div>
      )}
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
