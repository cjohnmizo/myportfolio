"use client";

import { SunMoon } from "lucide-react";

const ThemeToggle = () => {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDarkMode = root.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--fg)] transition-colors hover:border-[var(--line-strong)]"
      aria-label="Toggle theme"
    >
      <SunMoon size={16} />
    </button>
  );
};

export default ThemeToggle;
