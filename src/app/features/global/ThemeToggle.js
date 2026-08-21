"use client";

import { useEffect, useState } from "react";
import { Sun } from "../../icons/Sun";
import { Moon } from "../../icons/Moon";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setIsDark(stored === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative w-14 h-8 shrink-0 rounded-full border flex items-center px-1 cursor-pointer overflow-hidden ${
        mounted ? "transition-colors duration-500 ease-out" : ""
      } ${
        isDark
          ? "bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] border-[#3f3f46]"
          : "bg-gradient-to-r from-[#7dd3fc] to-[#bae6fd] border-[#E4E4E7]"
      }`}
    >
      <span
        className={`absolute left-2 top-1.5 w-[3px] h-[3px] rounded-full bg-white transition-opacity duration-500 ${
          isDark ? "opacity-80" : "opacity-0"
        }`}
      />
      <span
        className={`absolute left-4.5 top-3.5 w-[2px] h-[2px] rounded-full bg-white transition-opacity duration-700 delay-100 ${
          isDark ? "opacity-60" : "opacity-0"
        }`}
      />
      <span
        className={`absolute left-3 top-5.5 w-[2px] h-[2px] rounded-full bg-white transition-opacity duration-500 delay-150 ${
          isDark ? "opacity-70" : "opacity-0"
        }`}
      />

      <span
        className={`relative z-10 w-6 h-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] flex items-center justify-center ${
          mounted
            ? "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            : ""
        } ${isDark ? "translate-x-6" : "translate-x-0"}`}
      >
        <Sun
          className={`absolute w-3.5 h-3.5 text-amber-500 transition-all duration-300 ${
            isDark
              ? "opacity-0 scale-50 rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Moon
          className={`absolute w-3 h-3 text-indigo-500 transition-all duration-300 ${
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-90"
          }`}
        />
      </span>
    </button>
  );
};
