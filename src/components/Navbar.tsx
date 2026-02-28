"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/data/config";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Services", to: "services" },
  { name: "Projects", to: "projects" },
  { name: "Skills", to: "skills" },
  { name: "Process", to: "process" },
  { name: "About", to: "about" },
  { name: "Contact", to: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 w-[calc(100%-1.5rem)] max-w-6xl">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`surface relative transition-all duration-300 ${
            scrolled ? "shadow-[0_16px_36px_-24px_var(--shadow-strong)]" : ""
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-sm font-bold tracking-tight text-[var(--accent)]">
                CJ
              </span>
              <span className="text-sm font-semibold tracking-wide text-[var(--fg)] sm:text-base">
                cjohnmizo
              </span>
            </Link>

            <div className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-90}
                  className="cursor-pointer text-sm font-medium text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <Link
                href={config.profile.resumeLink}
                className="button-secondary"
              >
                Resume
                <Download size={15} />
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg)]"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="border-t border-[var(--line)] px-4 py-4 lg:hidden"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <ScrollLink
                      key={link.name}
                      to={link.to}
                      smooth
                      duration={500}
                      offset={-90}
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-[var(--fg-soft)] transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--fg)]"
                    >
                      {link.name}
                    </ScrollLink>
                  ))}
                  <Link
                    href={config.profile.resumeLink}
                    onClick={() => setIsOpen(false)}
                    className="button-primary mt-2"
                  >
                    Download Resume
                    <Download size={15} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
};

export default Navbar;
