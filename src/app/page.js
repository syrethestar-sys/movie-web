import Image from "next/image";
import { Header } from "./features/Header";
import { HeroSection } from "./features/HeroSection";
import { Footer } from "./features/Footer";
import { Upcoming } from "./features/Upcoming";
import { Popular } from "./features/Popular";
import { TopRated } from "./features/TopRated";

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <Header />
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
