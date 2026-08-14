import { HeaderSkeleton } from "./components/skeletons/HeaderSkeleton";
import { HeroSectionSkeleton } from "./components/skeletons/HeroSectionSkeleton";
import { MovieGridSkeleton } from "./components/skeletons/MovieGridSkeleton";
import { FooterSkeleton } from "./components/skeletons/FooterSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-6">
        <HeaderSkeleton />
      </div>
      <div className="mb-13">
        <HeroSectionSkeleton />
      </div>
      <div className="w-full flex flex-col gap-13 mb-13 justify-center items-center">
        <MovieGridSkeleton />
        <MovieGridSkeleton />
        <MovieGridSkeleton />
      </div>
      <FooterSkeleton />
    </div>
  );
}
