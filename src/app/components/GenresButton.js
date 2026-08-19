import { useRouter } from "next/navigation";
import { RightArrow } from "../icons/RightArrow";
import { WhiteX } from "../icons/WhiteX";

export const GenresButton = ({ key, title, onClick, isSelected }) => {
  const router = useRouter();
  return (
    <button
      // onClick={handClick}
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
        isSelected
          ? "flex items-center gap-2 h-5 rounded-full border border-[#E4E4E7] bg-black text-white text-[12px] font-medium leading-4 px-3 cursor-pointer transition-all duration-150 ease-in-out hover:bg-gray-100 hover:border-gray-300 active:scale-95 active:bg-gray-200"
          : "flex items-center gap-2 h-5 rounded-full border border-[#E4E4E7] bg-white text-[12px] font-medium leading-4 px-3 cursor-pointer transition-all duration-150 ease-in-out hover:bg-gray-100 hover:border-gray-300 active:scale-95 active:bg-gray-200"
      }`}
    >
      {title}
      {isSelected ? <WhiteX /> : <RightArrow />}
    </button>
  );
};
