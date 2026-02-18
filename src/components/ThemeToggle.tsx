"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved = saved || (prefersDark ? "dark" : "light");

        setTheme(resolved);
        document.documentElement.classList.toggle("dark", resolved === "dark");
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <div className="w-[18px] h-[18px] rounded-full bg-[var(--fg-muted)]" />
            </div>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--fg)] bg-[var(--card-bg)] shadow-[5px_5px_10px_var(--shadow),-5px_-5px_10px_var(--inner-highlight)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    {theme === "dark" ? <Moon size={22} className="text-blue-300 fill-blue-300" /> : <Sun size={22} className="text-amber-400 fill-amber-400" />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
