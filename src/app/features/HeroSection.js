import Image from "next/image";
import { MovieStar } from "../icons/MovieStar";
import { MovieTrailerArrow } from "../icons/MovieTrailerArrow";
import { RightArrow } from "../icons/RightArrow";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-150 overflow-hidden">
      {/* image */}
      <Image
        src="/Moana2New.jpg"
        alt="Hero Background"
        fill
        className="object-cover absolute z-10 scale-150"
        priority
      />
      {/* Texts */}
      <div className="absolute z-20 w-101 h-66 flex flex-col gap-4 left-35 top-44.5">
        <div className="">
          <p className="font-sans font-normal text-base text-white h-6">
            Now Playing:
          </p>
          <p className="font-sans font-bold text-[36px] text-white h-10">
            Moana 2
          </p>
          <div className="w-21 h-12 flex flex-row justify-center items-center gap-1">
            <MovieStar />
            <p className="text-white text-[18px] font-semibold">6.9</p>
            <span className="text-[#71717A] text-[16px]">/10</span>
          </div>
        </div>
        <div className="text-[#FAFAFA] text-[12px] font-sans font-extralight leading-4 w-75.5">
          After receiving an unexpected call from her wayfinding ancestors,
          Moana must journey to the far seas of Oceania and into dangerous,
          long-lost waters for an adventure unlike anything she&apos;s ever
          faced.
        </div>
        <button className="w-36.25 h-10 bg-white rounded-lg flex justify-center items-center gap-2 cursor-pointer">
          <MovieTrailerArrow />
          <p>Watch Trailer</p>
        </button>
      </div>
      {/* dots */}
      <div className="absolute bottom-9.25 left-1/2 -translate-x-1/2 w-max h-max z-20 flex flex-row gap-2 ">
        <div className=" w-2 h-2 bg-white rounded-full "></div>
        <div className=" w-2 h-2 bg-white/50 rounded-full"></div>
        <div className=" w-2 h-2 bg-white/50 rounded-full "></div>
      </div>
      {/* next button */}
      <button className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 right-11 -translate-x-1/2 cursor-pointer">
        <RightArrow />
      </button>
    </div>
  );
};
