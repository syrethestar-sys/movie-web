"use client";
import { useEffect, useState } from "react";
import { MovieTitlesFluid } from "../components/MovieTitlesFluid";
import { MovieCardSkeletonFluid } from "../components/skeletons/MovieCardSkeletonFluid";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";
export default function MoreLikeThis({ id }){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };
  useEffect(() => {
    if (!id) return;
    getData()
      .then((data) => setData(data))
      .catch(() => setErrorMessage("MOVE API ERROR"))
      .finally(() => setLoading(false));
  }, [id]);

  const dataSliced = data.slice(0, 10);

  return (
    <div className="max-w-6xl w-full px-4 mb-8">
      {loading && (
        <div className="w-full gap-10 grid grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeletonFluid key={index} />
          ))}
        </div>
      )}
      {!loading && errorMessage && <div>{errorMessage}</div>}
      {!loading && !errorMessage && (
        <div className="w-full gap-10 grid grid-cols-5">
          {dataSliced.map((movie) => (
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
      )}
    </div>
  );
};
