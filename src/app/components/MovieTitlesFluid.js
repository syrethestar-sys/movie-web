import { useRouter } from "next/navigation";
import { MovieRatingStar } from "../icons/MovieRatingStar";
import Image from "next/image";

export const MovieTitlesFluid = (props) => {
  const router = useRouter();
  const { src, rating, title, alt, id } = props;
  const handleDetailClick = () => {
    router.push(`/detail/${id}`);
  };

  return (
    <div
      onClick={handleDetailClick}
      className="w-full bg-[#F4F4F5] rounded-xl flex flex-col gap-1 cursor-pointer"
    >
      <div className="relative w-full aspect-2/3">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1152px) 210px, 20vw"
          className="object-cover rounded-t-[10px]"
        />
      </div>
      <div className="h-23.75 bg-[#F4F4F5] rounded-b-[10px] p-2 flex flex-col gap-1 cursor-pointer">
        <div className="w-full flex items-center gap-1">
          <div className="w-4 h-4.5 shrink-0">
            <MovieRatingStar />
          </div>
          <div className="flex items-center gap-0.5">
            <p className="text-[14px] font-normal leading-5">{rating}</p>
            <span className="text-xs text-[#71717A] font-extralight leading-4">
              /10
            </span>
          </div>
        </div>
        <p className="w-full text-lg leading-7 font-light truncate">
          {title}
        </p>
      </div>
    </div>
  );
};
