"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type PaginationBarProps = {
  page: string 
};

const PaginationBar: React.FC<PaginationBarProps> = ({ page }) => {
  const router = useRouter();

  let pageNumber = page ? parseInt(page) : 1;

  const handleClick = (x: number) => {
    if (x + pageNumber <= 0) return;
    pageNumber = pageNumber + x;
    router.push(`/?page=${pageNumber}`);
  };

  return (
    <div className="w-full flex justify-between items-center py-4">
      <p>page {page === undefined ? "1" : page}</p>
      <div className="flex items-center gap-8">
        <button onClick={() => handleClick(-1)}>Previous</button>
        <button onClick={() => handleClick(1)}>Next</button>
      </div>
    </div>
  );
};
export default PaginationBar;
