import { useRouter } from "next/navigation";
import Image from "next/image";
import { MovieRatingStar } from "@/app/icons/MovieRatingStar";

export const MovieTitles = (props) => {
  const router = useRouter();
  const { src, rating, title, alt, id } = props;
  const handleDetailClick = () => {
    router.push(`/detail/${id}`);
  };

  return (
    <div
      onClick={handleDetailClick}
      className="group w-41.25 bg-[#F4F4F5] rounded-xl flex flex-col gap-1 cursor-pointer"
    >
      <div className="relative w-full h-61 overflow-hidden rounded-t-[10px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="230px"
          className="object-cover transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-75"
        />
      </div>
      <div className="w-41.25 h-[87px] bg-[#F4F4F5] rounded-b-[10px] p-2 flex flex-col justify-center items-center gap-1">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4.5">
            <MovieRatingStar />
          </div>
          <div className="w-[149px] h-[5.75px] flex items-center gap-0.5">
            <p className="text-[14px] font-normal leading-5">{rating}</p>
            <span className="text-xs text-[#71717A] font-extralight leading-4">
              /10
            </span>
          </div>
        </div>
        <p className="w-[149px] h-14 text-[16px] leading-5 font-light">
          {title}
        </p>
      </div>
    </div>
  );
};
