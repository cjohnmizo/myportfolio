"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MagneticButton } from "@/components/animations/MagneticButton";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/home", code: "M-01" },
  { label: "About", href: "/about", code: "M-02" },
  { label: "Systems", href: "/services", code: "M-03" },
  { label: "Projects", href: "/projects", code: "M-04" },
  { label: "Skills", href: "/skills", code: "M-05" },
  { label: "Experience", href: "/experience", code: "M-06" },
  { label: "Contact", href: "/contact", code: "M-07" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/home") {
    return pathname === "/home";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MissionNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mission-nav mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-3 py-2.5 sm:px-4">
        <Link
          href="/home"
          aria-label={`${siteConfig.name} command center`}
          className="shrink-0 transition hover:opacity-90"
        >
          <BrandLogo />
        </Link>

        <nav
          aria-label="Mission navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mission-nav-link relative rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-muted-foreground mr-2 font-mono text-[0.66rem]">
                  {item.code}
                </span>
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="mission-nav-active"
                    className="bg-primary/12 border-primary/25 absolute inset-0 -z-10 rounded-xl border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            as="a"
            href="/contact"
            className="mission-launch-button hidden rounded-xl px-5 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            Start Mission
          </MagneticButton>
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open mission navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-lg" />
              <Dialog.Content className="bg-background/95 border-border fixed inset-3 z-50 overflow-hidden rounded-3xl border p-4 shadow-2xl shadow-black/20 sm:inset-6">
                <div className="mizo-pattern pointer-events-none absolute inset-0 opacity-[0.07]" />
                <div className="relative flex items-center justify-between">
                  <BrandLogo showTagline={false} />
                  <Dialog.Close asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Close mission navigation"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="relative mt-8 space-y-3">
                  <p className="section-kicker text-secondary text-xs font-semibold">
                    Mission System
                  </p>
                  <AnimatePresence>
                    {navItems.map((item, index) => {
                      const active = isActiveRoute(pathname, item.href);

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "group flex items-center justify-between rounded-2xl border px-4 py-4 text-lg font-semibold transition",
                              active
                                ? "border-primary/40 bg-primary/12 text-primary"
                                : "border-border bg-muted text-foreground hover:border-primary/30 hover:bg-primary/10",
                            )}
                          >
                            <span>
                              <span className="text-muted-foreground mr-3 font-mono text-xs">
                                {item.code}
                              </span>
                              {item.label}
                            </span>
                            <span className="bg-primary/20 h-2 w-2 rounded-full transition group-hover:scale-150" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
