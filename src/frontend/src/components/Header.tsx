import { cn } from "@/lib/utils";
import { BUSINESS, telLink } from "@/types";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Our work" },
  { href: "#areas", label: "Service areas" },
  { href: "#quote", label: "Get a quote" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          data-ocid="header.logo_link"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-sm bg-primary font-display text-lg font-bold text-primary-foreground"
          >
            Q
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Que Professional
            </span>
            <span className="label-mono block text-[0.6rem] text-muted-foreground">
              Services · Simunye
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`header.nav.${link.href.slice(1)}`}
              className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink()}
            data-ocid="header.call_button"
            className="hidden h-10 items-center gap-2 rounded-sm bg-primary px-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:-translate-y-0.5 hover:shadow-hard-sm sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="font-mono">{BUSINESS.phoneDisplay}</span>
          </a>
          <button
            type="button"
            data-ocid="header.menu_toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-card lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-6xl px-4 py-3 sm:px-6"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`header.mobile_nav.${link.href.slice(1)}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
