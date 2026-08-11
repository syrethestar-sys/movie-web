import { MovieTitles } from "../components/MovieTitles";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";

export const Upcoming = () => {
  return (
    <div className="w-359.25 h-244.5 flex flex-col items-center gap-8">
            <div className="w-319.25 h-9 text-black flex items-center justify-between">
              <p className="font-medium text-[24px]">Upcoming</p>
              <button className="flex items-center gap-2 text-[14px] font-light cursor-pointer">
                See more
                <SeeMoreArrow />
              </button>
            </div>
            <div className="w-319.25 h-227.5 gap-8 grid grid-cols-5">
              <MovieTitles
                src="/DearSanta.jpg"
                rating="6.9"
                alt="First Movie"
                title="Dear Santa"
              />
              <MovieTitles
                src="/Dragon.jpg"
                rating="6.9"
                alt="Second Movie"
                title="How To Train Your Dragon Live Action"
              />
              <MovieTitles
                src="/AlienRomulus.jpg"
                rating="6.9"
                alt="Third"
                title="Alien Romulus"
              />
              <MovieTitles
                src="/FromTheAshes.jpg"
                rating="6.9"
                alt="Fourth Movie"
                title="From the Ashes"
              />
              <MovieTitles
                src="/SpaceDogg.jpg"
                rating="6.9"
                alt="Fifth Movie"
                title="Space Dogg"
              />
              <MovieTitles
                src="/TheOrder.jpg"
                rating="6.9"
                alt="Sixth Movie"
                title="The Order"
              />
              <MovieTitles
                src="/Y2K.jpg"
                rating="6.9"
                alt="Seventh Movie"
                title="Y2K"
              />
              <MovieTitles
                src="/SoloLeveling.jpg"
                rating="6.9"
                alt="Eighth Movie"
                title="Solo leveling: ReAwakening"
              />
              <MovieTitles
                src="/GetAwayy.jpg"
                rating="6.9"
                alt="Nineth Movie"
                title="Get Away"
              />
              <MovieTitles
                src="/SonicTheHedgehog3.png"
                rating="6.9"
                alt="Tenth Movie"
                title="Sonic the Hedgehog 3"
              />
            </div>
          </div>
  );
};
