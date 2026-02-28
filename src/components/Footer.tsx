"use client";

import { Link as ScrollLink } from "react-scroll";
import { config } from "@/data/config";

const Footer = () => {
  const footerLinks = [
    { name: "Services", to: "services" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="relative z-10 border-t border-[var(--line)] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">{config.profile.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{config.profile.title}</p>
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--fg-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--fg)]"
              aria-label={social.name}
            >
              <social.icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-7 w-full max-w-6xl border-t border-[var(--line)] px-5 pt-5 text-xs text-[var(--muted)] sm:px-6">
        <p>
          Copyright {new Date().getFullYear()} {config.profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
