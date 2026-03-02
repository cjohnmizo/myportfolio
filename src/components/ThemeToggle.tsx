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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--fg)] shadow-[inset_0_1px_0_var(--line-strong),0_12px_24px_-20px_var(--shadow)] backdrop-blur-xl transition-all hover:scale-[1.03] hover:border-[var(--accent)]"
      aria-label="Toggle theme"
    >
      <SunMoon size={16} />
    </button>
  );
};

export default ThemeToggle;
