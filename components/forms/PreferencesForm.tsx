"use client";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiShapesLight } from "react-icons/pi";
import * as userOptions from "../../constants/userOptions";
import { GrRadialSelected, GrRadial } from "react-icons/gr";
import { updatePreferences } from "@/libs/actions/user.actions";
import { useRouter } from "next/navigation";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPersonRays } from "react-icons/fa6";
import { FaGlassCheers, FaGlobeAmericas } from "react-icons/fa";

type PreferencesFormProps = {
  user: {
    id: string;
    sexualOrientation: string;
    gender: string;
    preferences?: {
      age: { min: number; max: number };
      distance: number;
      relationshipstatus: string[];
      desires: string[];
      gender: string[];
      race: string[];
      sexualOrientation: string[];
    };
  };
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ user }) => {
  const router = useRouter();

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
    gender: user.preferences?.gender || [],
    age: {
      min: user.preferences?.age?.min || 18,
      max: user.preferences?.age?.max || 100,
    }, //slider?
    distance: user.preferences?.distance || 50, //max miles
    desires: user.preferences?.desires || [],
  });

  const handleSubmit = async () => {
    try {
      await updatePreferences({
        userId: user.id,
        gender: selected.gender,
        min: selected.age.min,
        max: selected.age.max,
        distance: selected.distance,
        desires: selected.desires,
      });

      console.log("preferences updated");

      router.push("/");
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  };

  type Preferences = {
    gender?: string[] | undefined;
    age?: number;
    desires?: string[] | undefined;
    distance?: number;
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
                name="min"
                id="min"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age?.min.toString() || "18"}
                min={18}
                value={selected.age.min}
                onChange={(e) => {
                  const minAge = parseInt(e.target.value);
                  const maxAge = selected.age.max;

                  // Ensure that minAge is not greater than maxAge
                  const newMinAge = minAge > maxAge ? maxAge : minAge;

                  setSelected({
                    ...selected,
                    age: {
                      min: newMinAge,
                      max: maxAge,
                    },
                  });
                }}
              />
            </label>
            <label htmlFor="max">
              max
              <input
                type="number"
                name="max"
                id="max"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age?.max.toString() || "100"}
                min={18}
                value={selected.age.max}
                onChange={(e) => {
                  const maxAge = parseInt(e.target.value);
                  const minAge = selected.age.min;

                  const newMaxAge = maxAge < minAge ? minAge : maxAge;

                  setSelected({
                    ...selected,
                    age: {
                      min: minAge,
                      max: newMaxAge,
                    },
                  });
                }}
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
            <label htmlFor="distance" className="px-2">
              within:
            </label>
            <input
              type="number"
              name="distance"
              id="distance"
              className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={user?.preferences?.distance?.toString() || "50"}
              min={50}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  distance: parseInt(e.target.value),
                })
              }
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

      <div className="relative w-full h-full">
        <div className="absolute h-full w-full z-10 top-0 left-0 bg-red-400/50" />
        <div className="absolute top-10 left-[40%] text-gray-300 p-4 rounded-full bg-black font-bold text-3xl z-20">
          <p>Coming Soon</p>
        </div>
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

        <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
          <FaPersonRays size={50} />
          <p>LOOKS</p>
        </div>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Body Type</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Height</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>

        <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
          <FaGlobeAmericas size={50} />
          <p>BACKGROUND</p>
        </div>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Languages</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Orientation</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Religion</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Politcal Views</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Education</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Employement</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>

        <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
          <FaGlassCheers size={50} />
          <p>LIFESTYLE</p>
        </div>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Alcohol</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Smoking</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
        <button className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100">
          <p>Marijuana</p>
          <BsChevronCompactRight size={25} className="text-blue-600" />
        </button>
      </div>

      <div className="w-full flex justify-center items-center py-4">
        <button
          className="bg-blue-500 text-xl text-white rounded-full px-12 py-4 font-bold hover:bg-blue-400 hover:text-gray-100"
          onClick={() => handleSubmit()}
        >
          Save
        </button>
      </div>
    </main>
  );
};
export default PreferencesForm;
