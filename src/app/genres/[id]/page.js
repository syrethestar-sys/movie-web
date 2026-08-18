"use client";

import { AllGenres } from "@/app/components/AllGenres";
import { GenresButton } from "@/app/components/GenresButton";
import { Footer } from "@/app/features/Footer";
import { Header } from "@/app/features/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export default function Genres() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      { headers: { Authorization: `Bearer ${api_token}` } }
    );
    const jsonData = await response.json();
    return jsonData.genres || [];
  };

  useEffect(() => {
    getData()
      .then((genresData) => setData(genresData))
      .catch(() => setErrorMessage("MOVIE API ERROR"));
  }, [id]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-7xl">
        <div className="h-9">Search filter</div>
        <div className="flex">
          <div>
            <div className="h-15 mb-5">
              <p className="text-[24px] font-semibold">Genres</p>
              <p className="text-[16px] font-light">
                See lists of movies by genre
              </p>
            </div>
            <div className="w-96.75 flex flex-wrap gap-4">
              {Array.isArray(data) &&
                data.map((genre) => (
                  <GenresButton key={genre.id} title={genre.name} />
                ))}
            </div>
          </div>
          <div className="w-px bg-[#E4E4E7] ml-4 mr-4"></div>
          <div className="w-201.5 bg-amber-400"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}