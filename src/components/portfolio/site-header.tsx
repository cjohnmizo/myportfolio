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
    <header className="border-border bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="transition hover:opacity-90"
        >
          <BrandLogo />
        </Link>
        <nav className="text-muted-foreground hidden items-center gap-7 text-sm font-medium md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/30" />
            <Dialog.Content className="border-border bg-card fixed inset-x-4 top-4 z-50 rounded-lg border p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <BrandLogo showTagline={false} />
                <Dialog.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close navigation"
                  >
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
                    className="border-border text-foreground hover:bg-muted rounded-md border px-4 py-3 text-base font-medium transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
