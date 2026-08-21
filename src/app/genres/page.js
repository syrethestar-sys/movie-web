"use client";

import { GenresButton } from "@/app/components/GenresButton";
import { MovieTitlesFluid } from "@/app/components/MovieTitlesFluid";
import { Pagination } from "@/app/components/Pagination";
import { Footer } from "@/app/features/global/Footer";
import { Header } from "@/app/features/global/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

function GenresContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIdsParam = searchParams.get("genreIds") || "";
  const selectedGenreIds = genreIdsParam
    ? genreIdsParam.split(",").map(Number).filter(Boolean)
    : [];
  const page = Number(searchParams.get("page")) || 1;

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const updateParams = (genreIds, newPage) => {
    const params = new URLSearchParams();
    if (genreIds.length > 0) params.set("genreIds", genreIds.join(","));
    if (newPage > 1) params.set("page", String(newPage));
    const query = params.toString();
    router.push(query ? `/genres?${query}` : "/genres");
  };

  const getGenres = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.genres || [];
  };

  const getMoviesByGenre = async (genreIds, pageNum) => {
    const genreQuery =
      genreIds.length > 0 ? `&with_genres=${genreIds.join(",")}` : "";
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en${genreQuery}&page=${pageNum}`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    return await response.json();
  };

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch(() => setErrorMessage("GENRE API ERROR"));
  }, []);

  useEffect(() => {
    setLoading(true);
    getMoviesByGenre(selectedGenreIds, page)
      .then((jsonData) => {
        setMovies(jsonData.results || []);
        setTotalPages(Math.min(jsonData.total_pages || 1, 500));
        setTotalResults(jsonData.total_results || 0);
        setErrorMessage("");
      })
      .catch(() => setErrorMessage("GENRE API ERROR"))
      .finally(() => setLoading(false));
  }, [genreIdsParam, page]);

  const handleGenreClick = (genreId) => {
    const next = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((id) => id !== genreId)
      : [...selectedGenreIds, genreId];
    updateParams(next, 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateParams(selectedGenreIds, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedGenreNames = genres
    .filter((genre) => selectedGenreIds.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="w-7xl px-4 my-6">
        <div className="h-9 font-semibold text-[30px]">Search filter</div>
        <div className="flex gap-6 mt-4">
          <div className="w-96">
            <div className="mb-5">
              <p className="text-[24px] font-semibold">Genres</p>
              <p className="text-[16px] font-light text-gray-500">
                See lists of movies by genre
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {Array.isArray(genres) &&
                genres.map((genre) => (
                  <GenresButton
                    key={genre.id}
                    title={genre.name}
                    isSelected={selectedGenreIds.includes(genre.id)}
                    onClick={() => handleGenreClick(genre.id)}
                  />
                ))}
            </div>
          </div>

          <div className="w-px bg-[#E4E4E7] self-stretch"></div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              &quot;{totalResults}&quot; titles
              {selectedGenreNames
                ? ` in "${selectedGenreNames}"`
                : ` in "All genres"`}
            </h2>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="grid grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieTitlesFluid
                  key={movie.id}
                  id={movie.id}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average.toFixed(1)}
                  alt={movie.title}
                  title={movie.title}
                />
              ))}
            </div>

            <div className="mt-10">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Genres() {
  return (
    <Suspense fallback={null}>
      <GenresContent />
    </Suspense>
  );
}

