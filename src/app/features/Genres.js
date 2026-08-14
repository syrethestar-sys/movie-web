import { GenresButton } from "../components/GenresButton";

export const Genres = (props) => {
  return (
    <div className="w-[calc(100%-2rem)] max-w-2xl h-auto absolute bg-white z-30 top-16 left-1/2 -translate-x-1/2 p-4 sm:p-6 box-border flex flex-col justify-between rounded-xl border border-[#E4E4E7] shadow-xl">
      
      {/* Толгойн хэсэг */}
      <div className="mb-4">
        <p className="text-xl sm:text-2xl font-semibold font-sans">Genres</p>
        <p className="text-sm sm:text-base font-light font-sans text-[#09090B]">
          See lists of movies by genre
        </p>
      </div>

      {/* Товчлууруудын жагсаалт (хэт олон товчлуур байвал гүйлгэдэг scroll-той) */}
      <div className="flex flex-wrap gap-2 sm:gap-3 border-t border-[#E4E4E7] pt-4 sm:pt-6 max-h-[60vh] overflow-y-auto">
        <GenresButton title="Action" />
        <GenresButton title="Adventure" />
        <GenresButton title="Animation" />
        <GenresButton title="Biography" />
        <GenresButton title="Comedy" />
        <GenresButton title="Crime" />
        <GenresButton title="Documentary" />
        <GenresButton title="Drama" />
        <GenresButton title="Family" />
        <GenresButton title="Fantasy" />
        <GenresButton title="Film-noir" />
        <GenresButton title="Game-Show" />
        <GenresButton title="History" />
        <GenresButton title="Horror" />
        <GenresButton title="Music" />
        <GenresButton title="Musical" />
        <GenresButton title="Mystery" />
        <GenresButton title="News" />
        <GenresButton title="Reality-TV" />
        <GenresButton title="Romance" />
        <GenresButton title="Sci-Fi" />
        <GenresButton title="Short" />
        <GenresButton title="Sports" />
        <GenresButton title="Talk-Show" />
        <GenresButton title="Thriller" />
        <GenresButton title="War" />
        <GenresButton title="Western" />
        <GenresButton title="Pornography" />
      </div>
    </div>
  );
};