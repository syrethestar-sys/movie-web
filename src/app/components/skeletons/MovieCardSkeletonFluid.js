import { Skeleton } from "./Skeleton";

export const MovieCardSkeletonFluid = () => {
  return (
    <div className="w-full bg-[#F4F4F5] rounded-xl flex flex-col gap-1">
      <Skeleton className="w-full aspect-[2/3] bg-[#E4E4E7] rounded-t-[10px]" />
      <div className="w-full rounded-b-[10px] p-2 flex flex-col justify-center items-center gap-2">
        <div className="w-full flex items-center justify-center gap-1.5">
          <Skeleton className="w-4 h-4.5 bg-[#E4E4E7] rounded-full" />
          <Skeleton className="w-12 h-4 bg-[#E4E4E7]" />
        </div>
        <Skeleton className="w-3/4 h-6 bg-[#E4E4E7]" />
      </div>
    </div>
  );
};
