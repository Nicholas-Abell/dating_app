"use client";

import React, { useState } from "react";

import { togglePreferencesSet } from "@/libs/actions/user.actions";
import Spinner from "../loadingSkeletons/Spinner";

type PreferencesToggleProps = {
  id: string;
  preferencesSet: boolean;
};

const PreferencesToggle: React.FC<PreferencesToggleProps> = ({
  id,
  preferencesSet,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (id: string) => {
    setLoading(true);
    try {
      await togglePreferencesSet(id);
    } catch (error: any) {
      console.log("Toggle Preferences Error: ", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4 px-8 h-32">
      {preferencesSet ? (
        <button
          onClick={() => handleClick(id)}
          className="P-1 bg-green-600 text-white rounded-3xl font-extrabold py-1 px-2"
        >
          <div className="flex items-center gap-2">
            <p>YES</p>
            <div className="bg-white z-10 p-4 rounded-full" />
          </div>
        </button>
      ) : (
        <button
          onClick={() => handleClick(id)}
          className="P-1 bg-gray-400 text-white rounded-3xl font-extrabold py-1 px-2"
        >
          <div className="flex items-center gap-2">
            <div className="bg-white z-10 p-4 rounded-full" />
            <p>NO</p>
          </div>
        </button>
      )}
      {loading && <Spinner />}
    </div>
  );
};
export default PreferencesToggle;
