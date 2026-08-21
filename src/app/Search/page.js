"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "../features/global/Header";
import { Footer } from "../features/global/Footer";
import { GenresButton } from "../components/GenresButton";
import { MovieTitles } from "./Components/MovieTitles";
import { Pagination } from "../components/Pagination";

// Must match your route folder exactly — Next.js paths are case-sensitive.
const SEARCH_PATH = "/Search";

const TMDB = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";
const authHeaders = {
  accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const genreIdsParam = searchParams.get("genreIds") || "";
  const selectedGenreIds = genreIdsParam
    ? genreIdsParam.split(",").map(Number).filter(Boolean)
    : [];

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const [genresError, setGenresError] = useState(null);

  // --- load the genre list once --------------------------------------------
  useEffect(() => {
    let alive = true;

    fetch(`${TMDB}/genre/movie/list?language=en`, { headers: authHeaders })
      .then((res) => {
        if (!res.ok) throw new Error(`Genres failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (alive) setGenres(data.genres ?? []);
      })
      .catch(() => {
        if (alive) setGenresError("Couldn't load genres");
      });

    return () => {
      alive = false;
    };
  }, []);

  // --- search whenever the query OR the page changes -------------------------
  useEffect(() => {
    if (!query) {
      setMovies([]);
      setStatus("idle");
      setTotalPages(1);
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetch(
      `${TMDB}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
      { headers: authHeaders, signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setMovies(data.results ?? []);
        setTotalPages(Math.min(data.total_pages || 1, 500)); // TMDB caps at 500
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [query, page]);

  // --- one helper for every URL update --------------------------------------
  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    }
    router.push(`${SEARCH_PATH}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    updateParams({ page: newPage > 1 ? newPage : null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setGenreIds = (genreIds) => {
    // Reset to page 1 — filters apply to whichever page you are on.
    updateParams({ genreIds: genreIds.join(",") || null, page: null });
  };

  const handleGenreClick = (genreId) => {
    setGenreIds(
      selectedGenreIds.includes(genreId)
        ? selectedGenreIds.filter((id) => id !== genreId)
        : [...selectedGenreIds, genreId],
    );
  };

  // --- genre filtering ------------------------------------------------------
  // `.every` = must match ALL selected genres. Swap to `.some` for ANY.
  const visibleMovies =
    selectedGenreIds.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenreIds.every((id) => movie.genre_ids?.includes(id)),
        );

  const filteredOutEverything =
    status === "success" && movies.length > 0 && visibleMovies.length === 0;

  const showPagination =
    status === "success" && movies.length > 0 && totalPages > 1;

  return (
    <>
      <Header />

      <main className="flex flex-col items-center gap-2">
        <p className="text-[30px] font-semibold w-[1228px]">Search results</p>

        <div className="flex gap-10 mb-10">
          <div className="flex flex-col gap-8 w-201">
            {status === "idle" && <p>Type something and press Enter.</p>}
            {status === "loading" && <p>Searching…</p>}
            {status === "error" && <p role="alert">{error}</p>}

            {status === "success" && movies.length === 0 && (
              <p>No results for &quot;{query}&quot;.</p>
            )}

            {filteredOutEverything && (
              <p>
                None of the {movies.length} results on this page match those
                genres.{" "}
                <button
                  type="button"
                  className="underline cursor-pointer"
                  onClick={() => setGenreIds([])}
                >
                  Clear filters
                </button>
              </p>
            )}

            {visibleMovies.length > 0 && (
              <>
                <p className="text-[20px] font-semibold">
                  {visibleMovies.length}
                  {selectedGenreIds.length > 0 && ` of ${movies.length}`}{" "}
                  results for &quot;{query}&quot;
                  {totalPages > 1 && ` — page ${page} of ${totalPages}`}
                </p>

                <div className="grid grid-cols-4 gap-12">
                  {visibleMovies.map((movie) => (
                    <MovieTitles
                      key={movie.id}
                      id={movie.id}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/poster-placeholder.png"
                      }
                      rating={movie.vote_average?.toFixed(1) ?? "—"}
                      alt={movie.title}
                      title={movie.title}
                      date={movie.release_date}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="w-96">
            <div className="mb-5">
              <p className="text-[24px] font-semibold">Genres</p>
              <p className="text-[16px] font-light text-gray-500">
                See lists of movies by genre
              </p>
            </div>

            {genresError && <p role="alert">{genresError}</p>}

            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <GenresButton
                  key={genre.id}
                  title={genre.name}
                  isSelected={selectedGenreIds.includes(genre.id)}
                  onClick={() => handleGenreClick(genre.id)}
                />
              ))}
            </div>

            {selectedGenreIds.length > 0 && (
              <button
                type="button"
                className="mt-4 text-[14px] underline text-gray-500 cursor-pointer"
                onClick={() => setGenreIds([])}
              >
                Clear all
              </button>
            )}
          </aside>
        </div>
        <div className="mb-10">
          {showPagination && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
