"use client";
import Image from "next/image";
import { MovieStar } from "../icons/MovieStar";
import { MovieTrailerArrow } from "../icons/MovieTrailerArrow";
import { RightArrow } from "../icons/RightArrow";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HeroSectionSkeleton } from "../components/skeletons/HeroSectionSkeleton";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

const getImageUrl = (movie) =>
  movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

const DRAG_THRESHOLD = 60;

export const HeroSection = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // crossfade: `displaySrc` is the settled frame underneath, `incomingSrc` fades in on top of it
  const [displaySrc, setDisplaySrc] = useState(null);
  const [incomingSrc, setIncomingSrc] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const dragInfo = useRef({ startX: 0, dragging: false, moved: false });
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

  const slides = data.slice(0, 6);
  const activeMovie = slides[activeIndex];

  useEffect(() => {
    if (!activeMovie) return;
    const url = getImageUrl(activeMovie);
    if (displaySrc === null) {
      setDisplaySrc(url);
      return;
    }
    if (url === displaySrc || url === incomingSrc) return;
    setFadeIn(false);
    setIncomingSrc(url);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setFadeIn(true)),
    );
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMovie?.id]);

  const handleFadeEnd = () => {
    if (!incomingSrc) return;
    setDisplaySrc(incomingSrc);
    setIncomingSrc(null);
    setFadeIn(false);
  };

  const handleNextClick = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };
  const handlePrevClick = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const handleImageClick = () => {
    if (dragInfo.current.moved) return;
    if (activeMovie) router.push(`/detail/${activeMovie.id}`);
  };

  useEffect(() => {
    if (slides.length === 0 || isHovering || isDragging) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [slides.length, isHovering, isDragging, activeIndex]);

  const handlePointerDown = (event) => {
    dragInfo.current = { startX: event.clientX, dragging: true, moved: false };
    setIsDragging(true);
  };
  const handlePointerMove = (event) => {
    if (!dragInfo.current.dragging) return;
    const delta = event.clientX - dragInfo.current.startX;
    if (Math.abs(delta) > 5) dragInfo.current.moved = true;
  };
  const endDrag = (event) => {
    if (!dragInfo.current.dragging) return;
    const delta = event.clientX - dragInfo.current.startX;
    dragInfo.current.dragging = false;
    setIsDragging(false);
    if (delta > DRAG_THRESHOLD) {
      handlePrevClick();
    } else if (delta < -DRAG_THRESHOLD) {
      handleNextClick();
    }
  };
  const handlePointerLeave = () => {
    dragInfo.current.dragging = false;
    setIsDragging(false);
    setIsHovering(false);
  };

  if (loading) return <HeroSectionSkeleton/>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!activeMovie) return null;

  return (
    <div
      className={`relative w-full h-190 overflow-hidden group select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
    >
      {/* settled frame */}
      {displaySrc && (
        <Image
          onClick={handleImageClick}
          src={displaySrc}
          alt={activeMovie.title}
          fill
          sizes="100vw"
          draggable={false}
          className="object-cover absolute inset-0 z-10 scale-150 brightness-75 cursor-pointer"
          priority
        />
      )}
      {/* incoming frame, crossfades on top of the settled one */}
      {incomingSrc && (
        <Image
          onClick={handleImageClick}
          onTransitionEnd={handleFadeEnd}
          src={incomingSrc}
          alt={activeMovie.title}
          fill
          sizes="100vw"
          draggable={false}
          style={{ opacity: fadeIn ? 1 : 0 }}
          className="object-cover absolute inset-0 z-11 scale-150 brightness-75 cursor-pointer transition-opacity duration-700 ease-in-out"
          priority
        />
      )}
      {/* vignette: darkens the edges and the left side so the text pops */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%), radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Texts */}
      <div className="absolute z-20 w-140 flex flex-col gap-6 left-72 top-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-1.5">
          <p className="font-sans font-normal text-xl text-white">
            Now Playing:
          </p>
          <p className="font-sans font-bold text-[64px] leading-[1.05] text-white w-180">
            {activeMovie.title}
          </p>
          <div className="h-14 flex flex-row items-center gap-2 mt-1">
            <MovieStar />
            <p className="text-white text-2xl font-semibold">
              {activeMovie.vote_average.toFixed(1)}
            </p>
            <span className="text-[#71717A] text-xl">/10</span>
          </div>
        </div>
        <div className="text-[#FAFAFA] text-base font-sans font-extralight leading-6 w-100 line-clamp-4">
          {activeMovie.overview}
        </div>
        <button className="w-52 h-13 bg-white rounded-lg flex justify-center items-center gap-2 cursor-pointer text-base font-medium">
          <MovieTrailerArrow />
          <p>Watch Trailer</p>
        </button>
      </div>
      {/* dots */}
      <div className="absolute bottom-9.25 left-1/2 -translate-x-1/2 w-max h-max z-20 flex flex-row items-center gap-2 ">
        {slides.map((movie, index) => (
          <div
            key={movie.id}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-3 h-3 bg-white" : "w-2 h-2 bg-white/50"
            }`}
          ></div>
        ))}
      </div>
      {/* prev button */}
      <button
        onClick={handlePrevClick}
        className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 left-11 translate-x-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <RightArrow className="rotate-180" />
      </button>
      {/* next button */}
      <button
        onClick={handleNextClick}
        className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 right-11 -translate-x-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <RightArrow />
      </button>
    </div>
  );
};
