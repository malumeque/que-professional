import {
  BUSINESS,
  SERVICE_AREAS,
  mailtoLink,
  mapsDirectionsLink,
  telLink,
  whatsappLink,
} from "@/types";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-sm bg-primary font-display text-lg font-bold text-primary-foreground"
            >
              Q
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Que Professional Services
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Concrete, roofing, remodeling, pest control and plumbing for homes
            and businesses across the Lubombo region. Built right, first time.
          </p>
          <p className="label-mono mt-5 text-muted-foreground">
            {BUSINESS.hours}
          </p>
        </div>

        <div>
          <h2 className="label-mono text-primary">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={telLink()}
                data-ocid="footer.call_link"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Phone
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="font-mono">{BUSINESS.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.whatsapp_link"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-accent"
              >
                <MessageCircle
                  className="size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                WhatsApp chat
              </a>
            </li>
            <li>
              <a
                href={mailtoLink()}
                data-ocid="footer.email_link"
                className="flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Mail
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="truncate">{BUSINESS.email}</span>
              </a>
            </li>
            <li>
              <a
                href={mapsDirectionsLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.directions_link"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <MapPin
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {BUSINESS.addressLine}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="label-mono text-primary">Service areas</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area.town}
                className="rounded-sm border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {area.town}
              </li>
            ))}
          </ul>
          <Link
            to="/admin"
            data-ocid="footer.admin_link"
            className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
          >
            Staff login →
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} Que Professional Services. All rights reserved.</p>
          <p>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
