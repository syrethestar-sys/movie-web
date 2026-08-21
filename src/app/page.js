import { Footer } from "./features/global/Footer";
import { Header } from "./features/global/Header";
import { HeroSection } from "./features/home/HeroSection";
import { Popular } from "./features/home/Popular";
import { TopRated } from "./features/home/TopRated";
import { Upcoming } from "./features/home/Upcoming";

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <Header/>
      </div>
      <div className="mb-13">
        <HeroSection />
      </div>
      {/* Movies */}
      <div className="w-full flex flex-col gap-13 mb-13 justify-center items-center">
          <Upcoming/>
          <Popular/>
          <TopRated/>
        </div>
      <Footer />
    </div>
  );
}
