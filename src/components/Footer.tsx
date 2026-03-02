"use client";

import { Link as ScrollLink } from "react-scroll";
import { config } from "@/data/config";

const Footer = () => {
  const footerLinks = [
    { name: "Projects", to: "projects" },
    { name: "Services", to: "services" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="relative z-10 pb-10 pt-6">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
        <div className="surface p-6 sm:p-7">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.08em] text-[var(--fg)]">{config.profile.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{config.profile.title}</p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {footerLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-90}
                  className="cursor-pointer text-sm text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {config.profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-7 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
            Copyright {new Date().getFullYear()} {config.profile.name}. Crafted with minimal systems and clear UX.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
