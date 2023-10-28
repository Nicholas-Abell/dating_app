"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleClick = (x: number) => {
    if (x + selectedImage < 0) {
      setSelectedImage(images.length - 1);
    } else if (x + selectedImage > images.length - 1) {
      setSelectedImage(0);
    } else {
      setSelectedImage((selectedImage) => selectedImage + x);
    }
  };

  return (
    <div className="w-full h-full relative">
      <button
        onClick={() => handleClick(-1)}
        className="z-10 absolute left-0 top-[50%] opacity-40 hover:opacity-100 cursor-pointer md:hidden"
      >
        <FaCircleChevronLeft size={50} />
      </button>
      <Image
        src={images[selectedImage]}
        alt="x"
        fill
        className=" object-cover"
      />
      <button
        onClick={() => handleClick(1)}
        className="z-10 absolute right-0 top-[50%] opacity-40 hover:opacity-100 cursor-pointer md:hidden"
      >
        <FaCircleChevronRight size={50} />
      </button>
    </div>
  );
};
export default ImageCarousel;
