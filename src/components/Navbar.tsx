"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 w-[calc(100%-1rem)] max-w-7xl sm:w-[calc(100%-2rem)]">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`glass-nav relative overflow-hidden transition-all duration-300 ${scrolled ? "glass-nav-scrolled" : ""}`}
        >
          <div className="relative z-10 flex h-16 items-center justify-between px-4 sm:h-[4.35rem] sm:px-6">
            <Link href="/" className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] shadow-[0_12px_28px_-22px_var(--shadow)]">
                <Image src="/favicon.ico" alt={config.profile.name} width={16} height={16} className="rounded-sm" />
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-[0.08em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  CJOHNMIZO
                </span>
                <span className="hidden text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] sm:block">
                  Product Engineer
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-6 xl:flex">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-90}
                  className="group relative cursor-pointer text-sm font-medium text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </ScrollLink>
              ))}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <ThemeToggle />
              <Link href={config.profile.resumeLink} className="button-secondary">
                Resume
                <Download size={14} />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--fg)] sm:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 border-t border-[var(--line)] bg-[var(--surface)] px-4 py-4 backdrop-blur-2xl"
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
                      className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-[var(--fg-soft)] transition-colors hover:bg-[var(--surface-strong)] hover:text-[var(--fg)]"
                    >
                      {link.name}
                    </ScrollLink>
                  ))}

                  <div className="mt-2 flex items-center gap-2">
                    <ThemeToggle />
                    <Link
                      href={config.profile.resumeLink}
                      onClick={() => setIsOpen(false)}
                      className="button-primary flex-1"
                    >
                      Download Resume
                      <Download size={14} />
                    </Link>
                  </div>
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
