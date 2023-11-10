"use client";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiShapesLight } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import * as userOptions from "../../constants/userOptions";
import { GrRadialSelected, GrRadial } from "react-icons/gr";
import { z } from "zod";
import { PreferencesValidation } from "@/libs/validations/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePreferences } from "@/libs/actions/user.actions";

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

  const form = useForm({
    resolver: zodResolver(PreferencesValidation),
    defaultValues: {
      gender:
        user?.preferences?.gender ||
        (user?.gender === "Man" && user?.sexualOrientation === "Straight")
          ? ["Woman"]
          : [""],
      age: {
        min: user.preferences?.age.min || 18,
        max: user.preferences?.age.max || 100,
      },
      distance: user.preferences?.distance || 5000,
      desires: user.preferences?.desires || [""],
    },
  });

  const onSubmit = async (values: z.infer<typeof PreferencesValidation>) => {
    try {
      await updatePreferences({
        userId: user?.id,
        gender: values.gender,
        min: values.age.min,
        max: values.age.min,
        distance: values.distance,
        desires: values.desires,
      });
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  };

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
      <div className="flex flex-col">
        test
        <div>gender {selected.gender}</div>
        <div>desires {selected.desires}</div>
        <div>min {selected.age.min}</div>
        <div>max {selected.age.max}</div>
        <div>distance {selected.distance}</div>
      </div>
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
                // {...form.register("min")}
                name="min"
                id="min"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age.min.toString() || "18"}
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
                // {...form.register("max")}
                name="max"
                id="max"
                className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={user?.preferences?.age.max.toString() || "100"}
                min={18}
                value={selected.age.max}
                onChange={(e) => {
                  const maxAge = parseInt(e.target.value);
                  const minAge = selected.age.min;

                  // Ensure that maxAge is not less than minAge
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
              // {...form.register("distance")}
              name="distance"
              id="distance"
              className="text-black w-full bg-gray-100 px-4 py-2 border border-white rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={user?.preferences?.distance.toString() || "50"}
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
