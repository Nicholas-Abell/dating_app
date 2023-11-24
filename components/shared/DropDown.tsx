"use client";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { GrRadialSelected, GrRadial } from "react-icons/gr";

type DropDownProps = {
  userOptions: any;
  selectedOptions: any;
  onClick: any;
  title: string;
};

const DropDown: React.FC<DropDownProps> = ({
  userOptions,
  onClick,
  selectedOptions,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-4 flex items-center justify-between gap-4 md:text-2xl text-black border-t border-b hover:bg-gray-100"
      >
        <p>{title}</p>
        <BsChevronCompactRight size={25} className="text-blue-600" />
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 px-12 py-4">
          {userOptions.map((options: any, key: number) => (
            <div key={key}>
              <button
                onClick={() => onClick(options)}
                className="flex items-center gap-4"
              >
                {selectedOptions.includes(options) ? (
                  <GrRadialSelected size={20} />
                ) : (
                  <GrRadial size={20} />
                )}
                {options}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default DropDown;
