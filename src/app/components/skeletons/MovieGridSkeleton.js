import { Skeleton } from "./Skeleton";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

export const MovieGridSkeleton = () => {
  return (
    <div className="w-359.25 h-244.5 flex flex-col items-center gap-8">
      <div className="w-319.25 h-9 flex items-center justify-between">
        <Skeleton className="w-32 h-7 bg-[#E4E4E7]" />
        <Skeleton className="w-20 h-5 bg-[#E4E4E7]" />
      </div>
      <div className="w-319.25 h-227.5 gap-8 grid grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
