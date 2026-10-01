import {
  CallButton,
  QuoteButton,
  SectionLabel,
  WhatsAppButton,
} from "@/components/ActionButtons";
import { GallerySection } from "@/components/GallerySection";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import {
  BUSINESS,
  SERVICES,
  SERVICE_AREAS,
  TRUST_STATS,
  mailtoLink,
  mapsDirectionsLink,
  mapsEmbedLink,
  telLink,
} from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        data-ocid="hero.section"
        className="relative overflow-hidden border-b border-border bg-hero-gradient"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blueprint opacity-60"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-fade-rise">
            <SectionLabel>Simunye · Lubombo · Eswatini</SectionLabel>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Built right.
              <br />
              <span className="text-primary">First time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Que Professional Services handles concrete, roofing, remodeling,
              pest control and plumbing for homes and businesses across the
              Lubombo region. One trusted team, five trades, honest pricing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton data-ocid="hero.call_button" />
              <WhatsAppButton data-ocid="hero.whatsapp_button" />
              <QuoteButton data-ocid="hero.quote_button" />
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="bg-card px-4 py-4">
                  <dt className="label-mono text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-rise">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-full w-full rounded-sm border border-primary/40 sm:block"
            />
            <img
              src="/assets/generated/hero-crew.dim_1536x1024.jpg"
              alt="Two Que Professional Services builders in high-visibility vests and hard hats reviewing architectural plans on site, with a brick house and roof trusses behind them"
              width={1536}
              height={1024}
              loading="eager"
              className="relative w-full rounded-sm border border-border object-cover shadow-hard-dark"
            />
            <div className="relative mt-4 flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 animate-pulse-soft rounded-full bg-primary"
              />
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Taking bookings this week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        data-ocid="services.section"
        className="scroll-mt-20 border-b border-border bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <SectionLabel>What we do</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
              Five trades, one accountable team
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              No juggling separate contractors. We scope the job, quote it
              clearly and finish it — from the foundation up to the last tap.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}

            <div className="flex flex-col justify-between rounded-sm border border-primary/40 bg-primary/5 p-6">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Not sure which you need?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Describe the problem and we'll tell you what it takes — and
                  what it costs — before any work starts.
                </p>
              </div>
              <Link
                to="/"
                hash="quote"
                data-ocid="services.quote_link"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary"
              >
                Ask for advice
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection />

      {/* Quote + map band */}
      <section
        id="quote"
        data-ocid="quote.section"
        className="scroll-mt-20 border-b border-border bg-muted/30 py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionLabel>Free quote</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
              Get a straight price
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Send us the details and we'll arrange a site visit. Prefer to talk
              it through? Call or WhatsApp — we answer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton data-ocid="quote.call_button" />
              <WhatsAppButton data-ocid="quote.whatsapp_button" />
            </div>

            <div className="mt-8 rounded-sm border border-border bg-card p-5">
              <p className="label-mono text-muted-foreground">Direct line</p>
              <a
                href={telLink()}
                data-ocid="quote.phone_link"
                className="mt-2 block font-mono text-2xl font-bold text-primary transition-colors hover:text-primary/80"
              >
                {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                {BUSINESS.hours}
              </p>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>

      {/* Location + service areas */}
      <section
        id="areas"
        data-ocid="areas.section"
        className="scroll-mt-20 border-b border-border bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <SectionLabel>Where we work</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
              Based in Simunye, on the road daily
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our home base is Simunye, Eswatini L301. We cover the surrounding
              Lubombo towns and travel further by arrangement.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-sm border border-border bg-card shadow-hard-dark">
              <iframe
                title="Map of Simunye, Eswatini — Que Professional Services service area"
                data-ocid="areas.map"
                src={mapsEmbedLink()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 grayscale-[35%] md:h-96"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {BUSINESS.addressLine}
                </p>
                <a
                  href={mapsDirectionsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="areas.directions_link"
                  className="inline-flex h-10 items-center gap-2 rounded-sm border border-primary/60 px-4 font-display text-xs font-semibold uppercase tracking-wider text-primary transition-smooth hover:-translate-y-0.5 hover:bg-primary/10"
                >
                  Get directions
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="label-mono text-primary">Towns served</h3>
              <ul className="mt-4 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
                {SERVICE_AREAS.map((area) => (
                  <li
                    key={area.town}
                    data-ocid={`areas.item.${area.town.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                      {area.town}
                    </span>
                    <span className="text-right font-mono text-xs text-muted-foreground">
                      {area.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        data-ocid="contact.section"
        className="scroll-mt-20 bg-muted/30 py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-sm border border-border bg-card p-8 shadow-hard-dark md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionLabel>Talk to us</SectionLabel>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                  Ready when you are
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Call, WhatsApp or email — whichever suits. We'll get back to
                  you with a clear next step.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  <li>
                    <a
                      href={telLink()}
                      data-ocid="contact.phone_link"
                      className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                    >
                      <Phone
                        className="size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-sm">
                        {BUSINESS.phoneDisplay}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailtoLink()}
                      data-ocid="contact.email_link"
                      className="flex min-w-0 items-center gap-3 text-foreground transition-colors hover:text-primary"
                    >
                      <Mail
                        className="size-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="truncate text-sm">{BUSINESS.email}</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <MapPin
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{BUSINESS.addressLine}</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <MessageCircle
                      className="size-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm">WhatsApp available</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 lg:w-64">
                <CallButton
                  className="w-full"
                  data-ocid="contact.call_button"
                />
                <WhatsAppButton
                  className="w-full"
                  data-ocid="contact.whatsapp_button"
                />
                <QuoteButton
                  className="w-full"
                  data-ocid="contact.quote_button"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
