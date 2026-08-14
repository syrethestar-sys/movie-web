import { HeaderSkeleton } from "../components/skeletons/HeaderSkeleton";
import { MovieGridSkeleton } from "../components/skeletons/MovieGridSkeleton";
import { FooterSkeleton } from "../components/skeletons/FooterSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-8">
        <HeaderSkeleton />
      </div>
      <div className="mb-13">
        <MovieGridSkeleton />
      </div>
      <FooterSkeleton />
    </div>
  );
}
