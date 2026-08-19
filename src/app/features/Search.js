"use client";

import { useEffect, useState } from "react";
import { GenresButton } from "../components/GenresButton";
import { useRouter } from "next/navigation";
import { SearchMovieTitles } from "../components/SearchMovieTitles";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export const Search = (props) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const searchValue = props.value;
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState(null);
  const getData = async () => {
    try {
      const endpoint = searchValue.trim()
        ? `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${api_token}` },
      });
      const jsonData = await response.json();
      return jsonData.results || [];
    } catch (error) {
      setErrorMessage("SEARCH API ERROR");
      return [];
    }
  };
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

  useEffect(() => {
    getData()
      .then((results) => {
        setData(results);
        setMovie(results);
      })
      .catch(() => setErrorMessage("SEARCH API ERROR"));
  }, [searchValue, page]);

  const hasQuery = Boolean(searchValue.trim());

  return (
    <div className="animate-dropdown w-[577px] max-w-[calc(100%-2rem)] h-auto absolute bg-white z-30 top-16 left-1/2 -translate-x-1/2 p-4 sm:p-6 box-border flex flex-col justify-between rounded-xl border border-[#E4E4E7] shadow-xl">
      <div>
        {!hasQuery && (
          <p className="text-sm font-medium text-[#71717A] mb-2">
            Popular Movies
          </p>
        )}
        {data.slice(0, 5).map((movie) => (
          <SearchMovieTitles
            key={movie.id}
            id={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rating={movie.vote_average.toFixed(1)}
            alt={movie.title}
            title={movie.title}
            date={movie.release_date}
          />
        ))}
      </div>
      <div className="flex mt-4">
        {hasQuery ? (
          <p className="flex gap-1">
            See all results for
            <span className="font-semibold">"{searchValue}"</span>
          </p>
        ) : (
          <button
            onClick={() => router.push("/Popular")}
            className="font-semibold cursor-pointer"
          >
            See all popular movies
          </button>
        )}
      </div>
    </div>
  );
};
