"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
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
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--spotlight)] transition-all active:scale-90 cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
