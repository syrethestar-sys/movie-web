import { Skeleton } from "./Skeleton";

export const MovieCardSkeleton = () => {
  return (
    <div className="w-[229.73px] h-109.75 bg-[#F4F4F5] rounded-xl flex flex-col gap-1">
      <Skeleton className="w-full h-85 bg-[#E4E4E7] rounded-t-[10px]" />
      <div className="w-[229.73] h-23.75 rounded-b-[10px] p-2 flex flex-col justify-center items-center gap-2">
        <div className="w-[193.73px] h-5.75 flex items-center gap-1.5">
          <Skeleton className="w-4 h-4.5 bg-[#E4E4E7] rounded-full" />
          <Skeleton className="w-12 h-4 bg-[#E4E4E7]" />
        </div>
        <Skeleton className="w-[213.73px] h-6 bg-[#E4E4E7]" />
      </div>
    </div>
  );
};
