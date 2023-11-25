"use client";
import { togglePreferencesSet } from "@/libs/actions/user.actions";
import React from "react";

type PreferencesToggleProps = {
  id: string;
  preferencesSet: boolean;
};

const PreferencesToggle: React.FC<PreferencesToggleProps> = ({
  id,
  preferencesSet,
}) => {
  return (
    <>
      {preferencesSet ? (
        <button
          onClick={() => togglePreferencesSet(id)}
          className="P-1 bg-green-600 text-white rounded-3xl font-extrabold py-1 px-2"
        >
          <div className="flex items-center gap-2">
            <p>YES</p>
            <div className="bg-white z-10 p-4 rounded-full" />
          </div>
        </button>
      ) : (
        <button
          onClick={() => togglePreferencesSet(id)}
          className="P-1 bg-gray-400 text-white rounded-3xl font-extrabold py-1 px-2"
        >
          <div className="flex items-center gap-2">
            <div className="bg-white z-10 p-4 rounded-full" />
            <p>NO</p>
          </div>
        </button>
      )}
    </>
  );
};
export default PreferencesToggle;
