"use client";

import { Logo } from "../icons/Logo";
import { Moon } from "../icons/Moon";
import { GenreDownArrow } from "../icons/GenreDownArrow";
import { MagnifiyingGlass } from "../icons/MagnifiyingGlass";
import { Genres } from "./Genres";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleGenre = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <header className="relative w-full h-14.75 bg-white flex items-center justify-center">
      <div className="max-w-7xl w-full h-9 flex items-center justify-between">
        <Logo className="w-23 h-5 cursor-pointer" />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleGenre}
            className="w-24.25 h-9 border border-[#E4E4E7] rounded-lg flex justify-center items-center gap-2 text-sm shadow-sm cursor-pointer"
          >
            <GenreDownArrow />
            Genre
          </button>
          {isOpen && <Genres />}
          <div className="relative ">
            <MagnifiyingGlass className="absolute w-4 h-4 left-3 top-2.5 cursor-pointer" />
            <input
              type="text"
              placeholder="Search.."
              className="w-94.75 h-9 border pl-9.5 border-[#E4E4E7] rounded-lg shadow-sm"
            />
          </div>
        </div>

        <button className="w-9 h-9 p-2 border-[#E4E4E7] border rounded-xl flex items-center justify-center shadow-sm cursor-pointer">
          <Moon />
        </button>
      </div>
    </header>
  );
};
