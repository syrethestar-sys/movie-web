import { useRouter } from "next/navigation";
import { RightArrow } from "../icons/RightArrow";

export const GenresButton = (props) => {
  const router = useRouter()

  const handleCLick = () => {
    router.push(`/genres/${props.title}`)
  }
  return (
    <button 
    onClick={handleCLick}
    className="flex items-center gap-2 h-5 rounded-full border border-[#E4E4E7] bg-white text-[12px] font-medium leading-4 px-3 cursor-pointer transition-all duration-150 ease-in-out hover:bg-gray-100 hover:border-gray-300 active:scale-95 active:bg-gray-200">
      {props.title}
      <RightArrow />
    </button>
  );
};
