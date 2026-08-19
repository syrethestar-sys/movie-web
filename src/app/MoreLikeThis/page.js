"use client";
import { Suspense, useEffect, useState } from "react";
import { MovieTitlesFluid } from "../components/MovieTitlesFluid";
import { MovieCardSkeletonFluid } from "../components/skeletons/MovieCardSkeletonFluid";
import { Footer } from "../features/Footer";
import { MovieTitles } from "../components/MovieTitles";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";
import { MovieGridSkeleton } from "../components/skeletons/MovieGridSkeleton";
import { Header } from "../features/Header";
import { Pagination } from "../components/Pagination";
import { useSearchParams } from "next/navigation";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzY4YWFhNjIyZTM2OGI3Y2ViYjIwY2U5NDRmYzRlNCIsIm5iZiI6MTc4NjY3MDA1NS4wMDEsInN1YiI6IjZhN2U2YmU2MDYwMWRiYzk2OTFjMzE5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7_Jcnn8NgQKKbmYajBFJEUpOrA5mzmI_-wqOkzekQQ4";

export default function MoreLikeThisPage() {
  return (
    <Suspense fallback={<MovieGridSkeleton />}>
      <MoreLikeThis />
    </Suspense>
  );
}

function MoreLikeThis() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData;
  };
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const jsonData = await getData();
        setData(jsonData.results || []);
        setTotalPages(Math.min(jsonData.total_pages || 1, 500));
      } catch {
        setErrorMessage("MOVE API ERROR");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dataSliced = data.slice(0, 10);

  return (
    <div>
      <div className="mb-8">
        <Header />
      </div>
      <div className="flex flex-col items-center">
        {loading && <MovieGridSkeleton />}
        {!loading && errorMessage && <div>{errorMessage}</div>}
        {!loading && !errorMessage && (
          <div className="w-359.25 h-244.5 flex flex-col items-center gap-8 mb-13">
            <div className="w-319.25 h-9 text-black flex items-center justify-between">
              <p className="font-medium text-[24px]">More like this</p>
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
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <div className="mt-25">
        <Footer />
      </div>
    </div>
  );
}
