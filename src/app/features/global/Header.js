"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../../icons/Logo";
import { GenreDownArrow } from "../../icons/GenreDownArrow";
import { MagnifiyingGlass } from "../../icons/MagnifiyingGlass";
import { Genres } from "./Genres";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter("");
  const [query, setQuery] = useState("");
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim()) {
      router.push(`/Search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  return (
    <header className="relative w-full h-14.75 bg-white dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <div className="max-w-7xl w-full h-9 flex items-center justify-between">
        <Logo className="w-23 h-5 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div ref={genreRef}>
            <button
              onClick={toggleGenre}
              className="w-24.25 h-9 border border-[#E4E4E7] dark:border-zinc-700 dark:text-zinc-100 rounded-lg flex justify-center items-center gap-2 text-sm shadow-sm cursor-pointer transition-colors duration-500"
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
                onChange={(e) => {
                  setValue(e.target.value);
                  setQuery(e.target.value);
                  openSearch();
                }}
                onFocus={openSearch}
                onKeyDown={handleKeyDown}
                type="text"
                value={value}
                placeholder="Search.."
                className="w-94.75 h-9 border pl-9.5 border-[#E4E4E7] dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 rounded-lg shadow-sm transition-colors duration-500"
              />
            </div>
            {isTyping && <Search value={value} />}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};
