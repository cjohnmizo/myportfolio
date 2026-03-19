"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="transition hover:opacity-95">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/projects" className="transition hover:text-foreground">
            Archive
          </Link>
        </nav>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-x-4 top-6 z-50 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/50">
              <div className="flex items-center justify-between">
                <BrandLogo showTagline={false} />
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close navigation">
                    <X className="h-5 w-5" />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {siteConfig.navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-white/5 px-4 py-3 text-base text-foreground transition hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/5 px-4 py-3 text-base text-foreground transition hover:bg-white/5"
                >
                  Archive
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
