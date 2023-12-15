"use client";
// import { updateLocation } from "@/libs/actions/user.actions";
import React from "react";

type LocationFormProps = {
  id: string;
  city: string;
};

const LocationButton: React.FC<LocationFormProps> = ({ id, city }) => {
  return (
    <>
      <div className="w-full bg-gray-400 font-bold px-2">
        <p>Location</p>
      </div>
      <div className="flex justify-start w-full items-center gap-4">
        <p>{city}</p>
        <div className="flex items-center py-2">
          <button
            onClick={() => console.log("Coming soon")}
            className="bg-blue-500  text-white rounded-full px-4 py-1 font-bold hover:bg-blue-400 hover:text-gray-100"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};
export default LocationButton;
