import { MovieTitles } from "../components/MovieTitles";
import { SeeMoreArrow } from "../icons/SeeMoreArrow";

export const Popular = () => {
  return (
    <div className="w-359.25 h-244.5 flex flex-col items-center gap-8">
            <div className="w-319.25 h-9 text-black flex items-center justify-between">
              <p className="font-medium text-[24px]">Popular</p>
              <button className="flex items-center gap-2 text-[14px] font-light cursor-pointer">
                See more
                <SeeMoreArrow />
              </button>
            </div>
            <div className="w-319.25 h-227.5 gap-8 grid grid-cols-5">
              <MovieTitles
                src="/Terminator2JudgmentDay.png"
                rating="6.9"
                alt="First Movie"
                title="Terminator 2 judgment day"
              />
              <MovieTitles
                src="/CityOfGod.png"
                rating="6.9"
                alt="Second Movie"
                title="City of god"
              />
              <MovieTitles
                src="/Interstellar.png"
                rating="6.9"
                alt="First Movie"
                title="Interstellar"
              />
              <MovieTitles
                src="/ItsAWonderfulLife.png"
                rating="6.9"
                alt="First Movie"
                title="It's a wonderful life"
              />
              <MovieTitles
                src="/SavingPrivateRyan.png"
                rating="6.9"
                alt="First Movie"
                title="Saving private ryan"
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
