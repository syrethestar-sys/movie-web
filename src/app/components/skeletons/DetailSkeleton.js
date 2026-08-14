import { Skeleton } from "./Skeleton";
import { MovieCardSkeleton } from "./MovieCardSkeleton";
import { HeaderSkeleton } from "./HeaderSkeleton";
import { FooterSkeleton } from "./FooterSkeleton";

export const DetailSkeleton = () => {
  return (
    <div className="flex flex-col items-center min-h-screen relative">
      <HeaderSkeleton />

      <div className="max-w-6xl w-full px-4 mb-8 mt-12">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-64 h-10 bg-[#E4E4E7]" />
            <Skeleton className="w-48 h-5 bg-[#E4E4E7]" />
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Skeleton className="w-12 h-3 bg-[#E4E4E7]" />
            <Skeleton className="w-14 h-6 bg-[#E4E4E7]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <Skeleton className="relative w-full md:w-72 h-[430px] bg-[#E4E4E7] rounded-xl shrink-0" />
          <Skeleton className="relative w-full flex-1 h-[430px] bg-[#E4E4E7] rounded-xl" />
        </div>
      </div>

      <div className="max-w-6xl w-full px-4 flex flex-col gap-5 mb-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-24 h-6 bg-[#E4E4E7] rounded-full" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-4 bg-[#E4E4E7]" />
          <Skeleton className="w-full h-4 bg-[#E4E4E7]" />
          <Skeleton className="w-2/3 h-4 bg-[#E4E4E7]" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <Skeleton className="w-20 h-4 bg-[#E4E4E7] shrink-0" />
            <Skeleton className="w-48 h-4 bg-[#E4E4E7]" />
          </div>
          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <Skeleton className="w-20 h-4 bg-[#E4E4E7] shrink-0" />
            <Skeleton className="w-72 h-4 bg-[#E4E4E7]" />
          </div>
          <div className="flex gap-12 pb-3 border-b border-[#E4E4E7]">
            <Skeleton className="w-20 h-4 bg-[#E4E4E7] shrink-0" />
            <Skeleton className="w-64 h-4 bg-[#E4E4E7]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between h-9 text-black max-w-6xl w-full px-4 mb-6">
        <Skeleton className="w-40 h-7 bg-[#E4E4E7]" />
        <Skeleton className="w-20 h-5 bg-[#E4E4E7]" />
      </div>

      <div className="flex scale-100 gap-6 max-w-6xl w-full px-4 mb-28">
        {Array.from({ length: 5 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>

      <FooterSkeleton />
    </div>
  );
};
