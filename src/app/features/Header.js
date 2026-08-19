"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../icons/Logo";
import { Moon } from "../icons/Moon";
import { GenreDownArrow } from "../icons/GenreDownArrow";
import { MagnifiyingGlass } from "../icons/MagnifiyingGlass";
import { Genres } from "./Genres";
import Link from "next/link";
import { Search } from "./Search";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const genreRef = useRef(null);
  const searchRef = useRef(null);

  const toggleGenre = () => {
    setIsOpen((prev) => !prev);
  };
  const openSearch = () => {
    setIsTyping(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsTyping(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative w-full h-14.75 bg-white flex items-center justify-center">
      <div className="max-w-7xl w-full h-9 flex items-center justify-between">
        <Logo className="w-23 h-5 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div ref={genreRef}>
            <button
              onClick={toggleGenre}
              className="w-24.25 h-9 border border-[#E4E4E7] rounded-lg flex justify-center items-center gap-2 text-sm shadow-sm cursor-pointer"
            >
              <GenreDownArrow
                className={`transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
              Genre
            </button>
            {isOpen && <Genres />}
          </div>

          <div ref={searchRef}>
            <div className="relative">
              <MagnifiyingGlass className="absolute w-4 h-4 left-3 top-2.5 cursor-pointer" />
              <input
                onChange={(event) => {
                  setValue(event.target.value);
                  openSearch();
                }}
                onFocus={openSearch}
                type="text"
                value={value}
                placeholder="Search.."
                className="w-94.75 h-9 border pl-9.5 border-[#E4E4E7] rounded-lg shadow-sm"
              />
            </div>
            {isTyping && <Search value={value} />}
          </div>
        </div>

        <button className="w-9 h-9 p-2 border-[#E4E4E7] border rounded-xl flex items-center justify-center shadow-sm cursor-pointer">
          <Moon />
        </button>
      </div>
    </header>
  );
};
