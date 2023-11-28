"use client";
import React, { useEffect, useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiShapesLight } from "react-icons/pi";
import * as userOptions from "../../constants/userOptions";
import { updateLocation, updatePreferences } from "@/libs/actions/user.actions";
import { useRouter } from "next/navigation";
import { MdFamilyRestroom } from "react-icons/md";
import { FaGlassCheers, FaGlobeAmericas } from "react-icons/fa";
import DropDown from "../shared/DropDown";

type PreferencesFormProps = {
  user: {
    id: string;
    city: string;
    sexualOrientation: string;
    gender: string;
    preferences?: {
      preferencesSet: boolean;
      age: { min: number; max: number };
      distance: number;
      relationshipstatus: string[];
      desires: string[];
      gender: string[];
      race: string[];
      sexualOrientation: string[];
      pets: string[];
      kids: string[];
      orientation: string[];
      religion: string[];
      politicalViews: string[];
      smoking: string[];
      marijuana: string[];
      alcohol: string[];
    };
  };
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ user }) => {
  const router = useRouter();

  const [options, setOptions] = useState({ distance: false, age: false });

  const [selected, setSelected] = useState({
    gender: user.preferences?.gender || [],
    age: {
      min: user.preferences?.age?.min || 18,
      max: user.preferences?.age?.max || 100,
    },
    distance: user.preferences?.distance || 50, //max miles
    desires: user.preferences?.desires || [],
    pets: user.preferences?.pets || [],
    kids: user.preferences?.kids || [],
    orientation: user.preferences?.orientation || [],
    religion: user.preferences?.religion || [],
    politicalViews: user.preferences?.politicalViews || [],
    smoking: user.preferences?.smoking || [],
    marijuana: user.preferences?.marijuana || [],
    alcohol: user.preferences?.alcohol || [],
    race: user.preferences?.race || [],
    sexualOrientation: user?.preferences?.sexualOrientation || [],
    relationshipstatus: user?.preferences?.relationshipstatus || [],
  });

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleSubmit = async () => {
    try {
      await updatePreferences({
        userId: user.id,
        gender: selected.gender,
        min: selected.age.min,
        max: selected.age.max,
        distance: selected.distance,
        desires: selected.desires,
        pets: selected.pets,
        kids: selected.kids,
        orientation: selected.orientation,
        religion: selected.religion,
        politicalViews: selected.politicalViews,
        smoking: selected.smoking,
        marijuana: selected.marijuana,
        alcohol: selected.alcohol,
        race: selected.race,
        sexualOrientation: selected.sexualOrientation,
        relationshipstatus: selected.relationshipstatus,
      });

      console.log("preferences updated");

      router.push("/");
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  };

  type Preferences = {
    gender?: string[] | undefined;
    age?: number | undefined;
    desires?: string[] | undefined;
    distance?: number | undefined;
    pets?: string[] | undefined;
    kids?: string[] | undefined;
    orientation?: string[] | undefined;
    religion?: string[] | undefined;
    politicalViews?: string[] | undefined;
    smoking?: string[] | undefined;
    marijuana?: string[] | undefined;
    alcohol?: string[] | undefined;
    race?: string[] | undefined;
    relationshipstatus?: string[] | undefined;
    sexualOrientation?: string[] | undefined;
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
    <main className="w-full relative">
      {!user?.preferences?.preferencesSet && (
        <div className="absolute w-full h-full bg-red-600/70 z-20"></div>
      )}

      {/* Basic Start */}
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <PiShapesLight size={50} />
        <p>BASIC</p>
      </div>
      <DropDown
        title="Gender"
        userOptions={userOptions.enumGender}
        onClick={(value: string) => toggleSelected("gender", value)}
        selectedOptions={selected.gender}
      />
      <DropDown
        title="Sexual Orientation"
        userOptions={userOptions.enumSexualOrientation}
        selectedOptions={selected.sexualOrientation}
        onClick={(value: string) => toggleSelected("sexualOrientation", value)}
      />
      <DropDown
        title="Relationship Status"
        userOptions={userOptions.enumRelationshipstatus}
        selectedOptions={selected.relationshipstatus}
        onClick={(value: string) => toggleSelected("relationshipstatus", value)}
      />
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
      <DropDown
        userOptions={userOptions.enumLookingFor}
        selectedOptions={selected.desires}
        title="Desires"
        onClick={(value: string) => toggleSelected("desires", value)}
      />
      {/* Basic End */}

      {/* Family Start */}
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <MdFamilyRestroom size={50} />
        <p>FAMILY</p>
      </div>
      <DropDown
        title="Pets"
        userOptions={userOptions.enumPets}
        selectedOptions={selected.pets}
        onClick={(value: string) => toggleSelected("pets", value)}
      />
      <DropDown
        title="Kids"
        userOptions={userOptions.enumKids}
        selectedOptions={selected.kids}
        onClick={(value: string) => toggleSelected("kids", value)}
      />
      {/* Family End */}

      {/* Background Start */}
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <FaGlobeAmericas size={50} />
        <p>BACKGROUND</p>
      </div>
      <DropDown
        title="race"
        userOptions={userOptions.enumRace}
        selectedOptions={selected.race}
        onClick={(value: string) => toggleSelected("race", value)}
      />
      <DropDown
        title="Religion"
        userOptions={userOptions.enumReligion}
        selectedOptions={selected.religion}
        onClick={(value: string) => toggleSelected("religion", value)}
      />
      <DropDown
        title="Political Views"
        userOptions={userOptions.enumPoliticalViews}
        selectedOptions={selected.politicalViews}
        onClick={(value: string) => toggleSelected("politicalViews", value)}
      />
      {/* Background End */}

      {/* Lifestyle Start */}
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <FaGlassCheers size={50} />
        <p>LIFESTYLE</p>
      </div>
      <DropDown
        title="Alcohol"
        userOptions={userOptions.enumAlcohol}
        selectedOptions={selected.alcohol}
        onClick={(value: string) => toggleSelected("alcohol", value)}
      />
      <DropDown
        title="Smoking"
        userOptions={userOptions.enumSmoking}
        selectedOptions={selected.smoking}
        onClick={(value: string) => toggleSelected("smoking", value)}
      />
      <DropDown
        title="Marijuana"
        userOptions={userOptions.enumMarijuana}
        selectedOptions={selected.marijuana}
        onClick={(value: string) => toggleSelected("marijuana", value)}
      />
      {/* Lifestyle End */}

      <div className="w-full flex justify-center items-center py-4">
        <button
          className="bg-blue-500 text-xl text-white rounded-full px-12 py-4 font-bold hover:bg-blue-400 hover:text-gray-100"
          onClick={() => handleSubmit()}
        >
          Save
        </button>
      </div>
      <div className="bg-gray-200 w-full px-8 py-2 flex items-center gap-4 text-2xl font-bold text-black">
        <PiShapesLight size={50} />
        <p>Location</p>
      </div>
      <div className="px-8 py-4">
        <p>Current Location: {user.city}</p>
        <div className="flex items-center">
          <button
            onClick={() => updateLocation(user.id)}
            className="bg-blue-500 text-xl text-white rounded-full px-8 py-2 font-bold hover:bg-blue-400 hover:text-gray-100"
          >
            Update
          </button>
        </div>
      </div>
    </main>
  );
};
export default PreferencesForm;
