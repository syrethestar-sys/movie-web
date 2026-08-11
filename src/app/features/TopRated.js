import { MovieTitles } from "../components/MovieTitles";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";

export const TopRated = () => {
  return (
    <div className="w-359.25 h-244.5 flex flex-col items-center gap-8">
            <div className="w-319.25 h-9 text-black flex items-center justify-between">
              <p className="font-medium text-[24px]">Top Rated</p>
              <button className="flex items-center gap-2 text-[14px] font-light cursor-pointer">
                See more
                <SeeMoreArrow />
              </button>
            </div>
            <div className="w-319.25 h-227.5 gap-8 grid grid-cols-5">
              <MovieTitles
                src="/PulpFiction.jpg"
                rating="6.9"
                alt="First Movie"
                title="Pulp Fiction"
              />
              <MovieTitles
                src="/TheLordoftheRingsFellowshipoftheKingss.jpg"
                rating="6.9"
                alt="Second Movie"
                title="The Lord of the Rings: Fellowship of the Kings"
              />
              <MovieTitles
                src="/TheGoodtheBadandtheUgly.png"
                rating="6.9"
                alt="First Movie"
                title="The Good, the Bad and the Ugly"
              />
              <MovieTitles
                src="/ForrestGump.jpg"
                rating="6.9"
                alt="First Movie"
                title="Forrest Gump"
              />
              <MovieTitles
                src="/FightClub.jpg"
                rating="6.9"
                alt="First Movie"
                title="Fight Club"
              />
              <MovieTitles
                src="/Seven.png"
                rating="6.9"
                alt="First Movie"
                title="Seven"
              />
              <MovieTitles
                src="/SevenSamurai.png"
                rating="6.9"
                alt="First Movie"
                title="Seven samurai"
              />
              <MovieTitles
                src="/TheGreenMile.png"
                rating="6.9"
                alt="First Movie"
                title="The green mile"
              />
              <MovieTitles
                src="/TheSilenceOfTheLambs.png"
                rating="6.9"
                alt="First Movie"
                title="The silence of the lambs"
              />
              <MovieTitles
                src="/LifeIsBeautiful.png"
                rating="6.9"
                alt="First Movie"
                title="Life is Beautiful"
              />
            </div>
          </div>
  );
};
