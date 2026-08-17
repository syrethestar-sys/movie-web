"use client";
import Image from "next/image";
import { MovieStar } from "../icons/MovieStar";
import { MovieTrailerArrow } from "../icons/MovieTrailerArrow";
import { RightArrow } from "../icons/RightArrow";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeroSectionSkeleton } from "../components/skeletons/HeroSectionSkeleton";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export const HeroSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => setErrorMessage("MOVIE API ERROR"))
      .finally(() => setLoading(false));
  }, []);

  const slides = data.slice(0, 3);
  const activeMovie = slides[activeIndex];

  const handleDetailClick = () => {
    if (activeMovie) router.push(`/detail/${activeMovie.id}`);
  };
  const handleNextClick = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  if (loading) return <HeroSectionSkeleton/>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!activeMovie) return null;

  return (
    <div className="relative w-full h-150 overflow-hidden">
      {/* image */}
      <Image
        onClick={handleDetailClick}
        src={
          activeMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${activeMovie.poster_path}`
        }
        alt={activeMovie.title}
        fill
        sizes="100vw"
        className="object-cover absolute z-10 scale-150 cursor-pointer"
        priority
      />

      {/* Texts */}
      <div className="absolute z-20 w-101 h-66 flex flex-col gap-4 left-35 top-44.5">
        <div className="">
          <p className="font-sans font-normal text-base text-white h-6">
            Now Playing:
          </p>
          <p className="font-sans font-bold text-[36px] text-white h-15 w-150">
            {activeMovie.title}
          </p>
          <div className="w-21 h-12 flex flex-row justify-center items-center gap-1">
            <MovieStar />
            <p className="text-white text-[18px] font-semibold">
              {activeMovie.vote_average.toFixed(1)}
            </p>
            <span className="text-[#71717A] text-[16px]">/10</span>
          </div>
        </div>
        <div className="text-[#FAFAFA] text-[12px] font-sans font-extralight leading-4 w-75.5 line-clamp-4">
          {activeMovie.overview}
        </div>
        <button className="w-36.25 h-10 bg-white rounded-lg flex justify-center items-center gap-2 cursor-pointer">
          <MovieTrailerArrow />
          <p>Watch Trailer</p>
        </button>
      </div>
      {/* dots */}
      <div className="absolute bottom-9.25 left-1/2 -translate-x-1/2 w-max h-max z-20 flex flex-row gap-2 ">
        {slides.map((movie, index) => (
          <div
            key={movie.id}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
      {/* next button */}
      <button
        onClick={handleNextClick}
        className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 right-11 -translate-x-1/2 cursor-pointer"
      >
        <RightArrow />
      </button>
    </div>
  );
};
