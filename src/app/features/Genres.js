"use client";

import { useEffect, useState } from "react";
import { GenresButton } from "../components/GenresButton";
import { useRouter } from "next/navigation";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export const Genres = (props) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.genres || [];
  };

  useEffect(() => {
    getData()
      .then((genresData) => setData(genresData))
      .catch(() => setErrorMessage("MOVIE API ERROR"));
  }, []);

  const handleClick = (genreId) => {
    router.push(`/genres?genreIds=${genreId}`);
  };

  return (
    <div className="animate-dropdown w-[calc(100%-2rem)] max-w-2xl h-auto absolute bg-white z-30 top-16 left-1/2 -translate-x-1/2 p-4 sm:p-6 box-border flex flex-col justify-between rounded-xl border border-[#E4E4E7] shadow-xl">
      <div className="mb-4">
        <p className="text-xl sm:text-2xl font-semibold font-sans">Genres</p>
        <p className="text-sm sm:text-base font-light font-sans text-[#09090B]">
          See lists of movies by genre
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 border-t border-[#E4E4E7] pt-4 sm:pt-6 max-h-[60vh] overflow-y-auto">
        {Array.isArray(data) &&
          data.map((genre) => (
            <GenresButton
              key={genre.id}
              title={genre.name}
              onClick={() => handleClick(genre.id)}
            />
          ))}
      </div>
    </div>
  );
};