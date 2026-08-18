"use client";

import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";
import { MovieStar } from "../../icons/MovieStar";
import Image from "next/image";
import { SeeMoreArrow } from "../../icons/SeeMoreArrow";
import { MovieTrailerArrow } from "../../icons/MovieTrailerArrow";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MoreLikeThis from "../../features/MoreLikeThis";
import { DetailSkeleton } from "@/app/components/skeletons/DetailSkeleton";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export default function Detail() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const [trailer, setTrailer] = useState([]);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const loading = !movie || String(movie.id) !== String(id);

  const getMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        { headers: { Authorization: `Bearer ${api_token}` } },
      );
      return await response.json();
    } catch (error) {
      console.error("Movie detail error:", error);
    }
  };
  const getTrailer = async () => {
    if (!id) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };

  useEffect(() => {
    if (!id) return;
    getTrailer()
      .then((data) => setTrailer(data))
      .catch(() => setErrorMessage("MOVIE API ERROR"));
  }, [id]);

  const officialTrailer = trailer?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const youtubeKey = officialTrailer?.key || trailer?.[0]?.key;

  const getCredits = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        { headers: { Authorization: `Bearer ${api_token}` } },
      );
      return await response.json();
    } catch (error) {
      console.error("Credits error:", error);
      return { cast: [], crew: [] };
    }
  };

  useEffect(() => {
    if (!id) return;

    Promise.all([getMovieDetails(id), getCredits(id)]).then(
      ([movieData, creditsData]) => {
        setMovie(movieData);
        setCast(creditsData.cast || []);
        setCrew(creditsData.crew || []);
      },
    );
  }, [id]);

  const directors = crew
    .filter((person) => person.job === "Director")
    .map((d) => d.name)
    .join(" · ");

  const writers = crew
    .filter((person) => person.department === "Writing")
    .slice(0, 3)
    .map((w) => w.name)
    .join(" · ");

  if (loading) {
    return <DetailSkeleton />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      <Header />

      {/* Movie Detail Main Container */}
      <div className="max-w-6xl w-full px-4 mb-8 mt-12">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold leading-10 tracking-tight">
              {movie?.original_title}
            </h1>
            <p className="text-lg font-extralight mt-1">
              {movie?.release_date}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#09090B]">Rating</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <MovieStar />
                <div className="flex flex-col items-center">
                  <div className="flex flex-row items-center">
                    <p className="text-lg font-normal">
                      {movie?.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "0.0"}
                    </p>
                    <p className="text-xs text-[#71717A]">/10</p>
                  </div>
                  <p className="text-[#71717A] text-xs">
                    {movie?.vote_count}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pictures & Banner Container */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Vertical Poster */}
          <div className="relative w-full md:w-72 h-107.5 rounded-xl overflow-hidden shrink-0">
            {movie?.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="vertical poster"
                fill
                sizes="(min-width: 768px) 288px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Horizontal Cover Banner */}
          <div className="relative w-full flex-1 h-107.5 rounded-xl overflow-hidden bg-black flex items-center justify-center">
            {movie?.backdrop_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt="horizontal poster"
                fill
                sizes="(min-width: 768px) 800px, 100vw"
                className="object-cover brightness-75 z-0"
              />
            )}
            <div className="absolute z-10 left-6 bottom-6 flex items-center gap-3 text-white">
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white text-black hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
              >
                <MovieTrailerArrow />
              </button>
              <span
                className="font-semibold text-lg cursor-pointer select-none"
                onClick={() => setIsPlaying(true)}
              >
                Play trailer
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-10 right-4 bg-black/70 hover:bg-black text-white px-3 py-1.5 text-xs rounded-full z-50 cursor-pointer border border-white/20 transition-all flex items-center gap-1"
            >
              ✕
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div
            className="absolute inset-0 z-[-1]"
            onClick={() => setIsPlaying(false)}
          />
        </div>
      )}

      {/* Further details */}
      <div className="max-w-6xl w-full px-4 flex flex-col gap-5 mb-8">
        {/*(Genres) */}
        <div className="flex flex-wrap gap-2">
          {movie?.genres?.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full border border-[#E4E4E7] bg-white text-xs font-medium py-1 px-3"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div>
          <p className="text-base text-gray-800 leading-relaxed">
            {movie?.overview}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <p className="w-20 text-base font-bold shrink-0">Director</p>
            <p className="text-base font-light">{directors || "N/A"}</p>
          </div>

          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <p className="w-20 text-base font-bold shrink-0">Writers</p>
            <p className="text-base font-light">{writers || "N/A"}</p>
          </div>

          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <p className="w-20 text-base font-bold shrink-0">Stars</p>
            <p className="text-base font-light">
              {cast.length > 0
                ? cast
                    .slice(0, 5)
                    .map((actor) => actor.name)
                    .join(" · ")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* More Like This Header */}
      <div className="flex items-center justify-between h-9 text-black max-w-6xl w-full px-4 mb-6">
        <p className="font-medium text-2xl">More Like this</p>
        <button
          onClick={() => router.push(`/MoreLikeThis?id=${id}`)}
          className="flex items-center gap-2 text-sm font-light cursor-pointer hover:opacity-80 transition-opacity"
        >
          See more
          <SeeMoreArrow />
        </button>
      </div>

      {/* More Like This Cards Grid */}
      <MoreLikeThis id={id} />

      <Footer />
    </div>
  );
}
