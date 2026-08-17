"use client";

import { useEffect, useState } from "react";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";
import { MovieTitles } from "../components/MovieTitles";
import { Header } from "../features/Header";
import { Footer } from "../features/Footer";
import { MovieGridSkeleton } from "../components/skeletons/MovieGridSkeleton";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export default function Upcoming() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };
  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => setErrorMessage("MOVE API ERROR"))
      .finally(() => setLoading(false));
  }, []);

  const dataSliced = data.slice(0, 10);
  return (
    <div>
      <div className="mb-8">
        <Header />
      </div>
      {loading && <MovieGridSkeleton />}
      {!loading && errorMessage && <div>{errorMessage}</div>}
      {!loading && !errorMessage && (
        <div className="w-359.25 h-244.5 flex flex-col items-center gap-8 mb-13">
          <div className="w-319.25 h-9 text-black flex items-center justify-between">
            <p className="font-medium text-[24px]">Up Coming</p>
            <button className="flex items-center gap-2 text-[14px] font-light cursor-pointer">
              See more
              <SeeMoreArrow />
            </button>
          </div>
          <div className="w-319.25 h-227.5 gap-8 grid grid-cols-5">
            {dataSliced.map((movie) => (
              <MovieTitles
                key={movie.id}
                id={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average.toFixed(1)}
                alt={movie.title}
                title={movie.title}
              />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
