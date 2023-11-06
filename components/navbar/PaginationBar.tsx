"use client";
import React from "react";
import { useRouter } from "next/navigation";

type PaginationBarProps = {
  page: string;
  profileCount: number;
  profilePerPage: number;
};

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  profileCount,
  profilePerPage,
}) => {
  const router = useRouter();

  let pageNumber = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(profileCount / profilePerPage);

  const handleClick = (x: number) => {
    if (x + pageNumber <= 0) return;
    pageNumber = pageNumber + x;
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <div className="w-full flex justify-between items-center py-4 border-t border-gray-200">
      <p>
        page {page === undefined ? "1" : page} of {totalPages}
      </p>
      <div className="flex items-center gap-4">
        {pageNumber === 0 ? (
          <button
            className="text-bold border border-black rounded-xl px-4 py-2 hover:bg-gray-200"
            onClick={() => handleClick(-1)}
          >
            Previous
          </button>
        ) : (
          <div className="text-bold border border-black rounded-xl px-4 py-2 bg-gray-200">
            Previous
          </div>
        )}

        {pageNumber < totalPages ? (
          <button
            className="text-bold border border-black rounded-xl px-4 py-2 hover:bg-gray-200"
            onClick={() => handleClick(1)}
          >
            Next
          </button>
        ) : (
          <div className="text-bold border border-black rounded-xl px-4 py-2 bg-gray-200">
            Next
          </div>
        )}
      </div>
    </div>
  );
};
export default PaginationBar;
