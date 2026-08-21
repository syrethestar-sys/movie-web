"use client";
import Image from "next/image";
import { MovieStar } from "../../icons/MovieStar";
import { MovieTrailerArrow } from "../../icons/MovieTrailerArrow";
import { RightArrow } from "../../icons/RightArrow";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HeroSectionSkeleton } from "../../components/skeletons/HeroSectionSkeleton";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

const getImageUrl = (movie) =>
  movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

const SCROLL_THRESHOLD = 25;
const SETTLE_DELAY = 500;

export const HeroSection = () => {
  const [data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef(null);
  const wheelInfo = useRef({
    accumulated: 0,
    locked: false,
    lastAbsDelta: 0,
    timer: null,
  });
  const slidesCountRef = useRef(0);
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
  slidesCountRef.current = slides.length;

  const handleNextClick = () => {
    setActiveIndex((prev) => (prev + 1) % slidesCountRef.current);
  };
  const handlePrevClick = () => {
    setActiveIndex(
      (prev) => (prev - 1 + slidesCountRef.current) % slidesCountRef.current,
    );
  };
  const handleImageClick = () => {
    if (activeMovie) router.push(`/detail/${activeMovie.id}`);
  };

  // --- Trackpad хажуу шудралт / Shift + scroll ---
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event) => {
      if (slidesCountRef.current === 0) return;

      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      if (delta === 0) return;

      event.preventDefault();

      const info = wheelInfo.current;

      if (info.timer) clearTimeout(info.timer);
      info.timer = setTimeout(() => {
        info.accumulated = 0;
        info.locked = false;
      }, SETTLE_DELAY);

      if (info.locked) return;

      info.accumulated += delta;

      if (info.accumulated > SCROLL_THRESHOLD) {
        handleNextClick();
        info.locked = true;
        info.accumulated = 0;
      } else if (info.accumulated < -SCROLL_THRESHOLD) {
        handlePrevClick();
        info.locked = true;
        info.accumulated = 0;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
      if (wheelInfo.current.timer) clearTimeout(wheelInfo.current.timer);
    };
  }, [loading]);

  // --- Гарын сум товчнууд ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (slidesCountRef.current === 0) return;
      if (event.key === "ArrowRight") handleNextClick();
      if (event.key === "ArrowLeft") handlePrevClick();
      if (event.key === "Escape") setIsPlaying(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- Autoplay ---
  useEffect(() => {
    if (slides.length === 0 || isHovering || isPlaying) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [slides.length, isHovering, isPlaying, activeIndex]);

  const getTrailer = async () => {
    if (!activeMovie) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${activeMovie.id}/videos?language=en-US`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };

  useEffect(() => {
    if (!activeMovie?.id) return;
    setTrailer([]);
    getTrailer()
      .then((data) => setTrailer(data))
      .catch(() => setErrorMessage("MOVIE API ERROR"));
  }, [activeMovie?.id]);

  const officialTrailer = trailer?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const youtubeKey = officialTrailer?.key || trailer?.[0]?.key;

  if (loading) return <HeroSectionSkeleton />;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!activeMovie) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-220 overflow-hidden group select-none overscroll-x-contain bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {slides.map((movie, index) => (
        <Image
          key={movie.id}
          onClick={handleImageClick}
          src={getImageUrl(movie)}
          alt={movie.title}
          fill
          quality={100}
          sizes="100vw"
          draggable={false}
          priority={index === 0}
          loading="eager"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            zIndex: index === activeIndex ? 11 : 10,
          }}
          className="object-cover absolute inset-0 scale-150 brightness-75 cursor-pointer transition-opacity duration-500 ease-out"
        />
      ))}

      {/* vignette */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%), radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Texts */}
      <div className="absolute z-20 w-140 flex flex-col gap-6 left-50 top-1/2 -translate-y-1/2 pointer-events-none">
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

        <button
          onClick={() => setIsPlaying(true)}
          disabled={!youtubeKey}
          className="pointer-events-auto relative overflow-hidden bg-gradient-to-b from-white/25 to-white/10 hover:from-white/35 hover:to-white/15 backdrop-blur-lg border border-white/30 text-white rounded-full gap-2 w-40 h-16.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <MovieTrailerArrow />
          <p>Watch Trailer</p>
        </button>
      </div>

      {/* Trailer modal */}
      {isPlaying && (
        <div
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsPlaying(false)}
          />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-1.5 text-xs rounded-full z-50 cursor-pointer border border-white/20 transition-all flex items-center gap-1"
            >
              ✕
            </button>
            {youtubeKey ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/70">
                No trailer available
              </div>
            )}
          </div>
        </div>
      )}

      {/* dots */}
      <div className="absolute bottom-9.25 left-1/2 -translate-x-1/2 w-max h-max z-20 flex flex-row items-center gap-2">
        {slides.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex ? "w-3 h-3 bg-white" : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* prev button */}
      <button
        onClick={handlePrevClick}
        aria-label="Previous slide"
        className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 left-11 translate-x-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <RightArrow className="rotate-180" />
      </button>

      {/* next button */}
      <button
        onClick={handleNextClick}
        aria-label="Next slide"
        className="w-10 h-10 bg-white rounded-full absolute z-20 flex items-center justify-center bottom-1/2 right-11 -translate-x-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <RightArrow />
      </button>
    </div>
  );
};
