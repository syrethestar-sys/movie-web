import { Skeleton } from "./Skeleton";

export const HeroSectionSkeleton = () => {
  return (
    <div className="relative w-full h-150 overflow-hidden bg-[#F4F4F5]">
      <Skeleton className="absolute inset-0 bg-[#E4E4E7] rounded-none" />
      <div className="absolute z-20 w-101 h-66 flex flex-col gap-4 left-35 top-44.5">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-28 h-6 bg-white/40" />
          <Skeleton className="w-64 h-10 bg-white/40" />
          <Skeleton className="w-20 h-5 bg-white/40" />
        </div>
        <Skeleton className="w-75.5 h-16 bg-white/40" />
        <Skeleton className="w-36.25 h-10 bg-white/40 rounded-lg" />
      </div>
    </div>
  );
};
