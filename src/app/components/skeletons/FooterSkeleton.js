import { Skeleton } from "./Skeleton";

export const FooterSkeleton = () => {
  return (
    <div className="w-full h-70 bg-[#4338CA] flex justify-center items-center">
      <div className="w-7xl h-50 flex flex-row justify-between">
        <div className="w-61.75 h-50 flex flex-col gap-3">
          <Skeleton className="w-23 h-5 bg-white/30" />
          <Skeleton className="w-48 h-4 bg-white/30" />
        </div>
        <div className="w-228.25 h-50 flex flex-row gap-24 justify-end">
          <div className="w-43.5 h-50 gap-3 flex flex-col">
            <Skeleton className="w-32 h-4 bg-white/30" />
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-3">
                <Skeleton className="w-6 h-6 bg-white/30 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-14 h-3 bg-white/30" />
                  <Skeleton className="w-32 h-3 bg-white/30" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Skeleton className="w-6 h-6 bg-white/30 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-14 h-3 bg-white/30" />
                  <Skeleton className="w-32 h-3 bg-white/30" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-68.5 h-13 flex flex-col gap-3">
            <Skeleton className="w-20 h-4 bg-white/30" />
            <div className="flex flex-row gap-3">
              <Skeleton className="w-16 h-4 bg-white/30" />
              <Skeleton className="w-16 h-4 bg-white/30" />
              <Skeleton className="w-16 h-4 bg-white/30" />
              <Skeleton className="w-16 h-4 bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
