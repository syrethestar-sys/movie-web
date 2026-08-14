import { Skeleton } from "./Skeleton";

export const HeaderSkeleton = () => {
  return (
    <header className="relative w-full h-14.75 bg-white flex items-center justify-center">
      <div className="max-w-7xl w-full h-9 flex items-center justify-between">
        <Skeleton className="w-23 h-5 bg-[#E4E4E7]" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-24.25 h-9 bg-[#E4E4E7] rounded-lg" />
          <Skeleton className="w-94.75 h-9 bg-[#E4E4E7] rounded-lg" />
        </div>
        <Skeleton className="w-9 h-9 bg-[#E4E4E7] rounded-xl" />
      </div>
    </header>
  );
};
