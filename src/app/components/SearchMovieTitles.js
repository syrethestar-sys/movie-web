"use client";

import Image from "next/image";
import { MovieRatingStar } from "../icons/MovieRatingStar";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";
import { useRouter } from "next/navigation";

export const SearchMovieTitles = (props) => {
    const router = useRouter()
  const { src, rating, title, alt, id, date } = props;
  const handleSeeMore = () => {
    router.push(`/detail/${id}`);
  };
  const cleanDate = date.slice(0,4)
  return (
    <div className="h-[115px] p-2 flex gap-4 border-b-1 border-[#E4E4E7] box-border">
      <div className="relative w-[67px] h-[100px]">
        <Image src={src} alt={alt} fill className="object-cover rounded" />
      </div>
      <div className="w-[454px] flex flex-col justify-between ">
        <div className="">
          <p className="text-[16px] font-semibold">{title}</p>
          <div className="flex items-center">
            <MovieRatingStar />
            <p className="text-[14px] ml-1">{rating}</p>
            <p className="text-[12px] text-[#71717A]">/10</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-[14px]">{cleanDate}</p>
          <button
            onClick={handleSeeMore}
            className="flex items-center gap-2 text-[14px] font-light cursor-pointer"
          >
            See more
            <SeeMoreArrow />
          </button>
        </div>
      </div>
    </div>
  );
};
