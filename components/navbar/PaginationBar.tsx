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
    <div className="w-full flex justify-between items-center py-4">
      <p>
        page {page === undefined ? "1" : page} of {totalPages}
      </p>
      <div className="flex items-center gap-8">
        <button onClick={() => handleClick(-1)}>Previous</button>
        {pageNumber < totalPages ? (
          <button onClick={() => handleClick(1)}>Next</button>
        ) : (
          <div>Next</div>
        )}
      </div>
    </div>
  );
};
export default PaginationBar;
