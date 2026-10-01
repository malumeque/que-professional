import {
  CallButton,
  QuoteButton,
  SectionLabel,
  WhatsAppButton,
} from "@/components/ActionButtons";
import { ServiceIcon } from "@/components/ServiceIcon";
import { BUSINESS, SERVICES, getService, telLink } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

export function ServiceDetailPage() {
  const { slug } = useParams({ from: "/services/$slug" });
  const service = getService(slug);

  if (!service) {
    return (
      <section
        data-ocid="service.not_found_state"
        className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6"
      >
        <p className="label-mono text-primary">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground">
          Service not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          That service isn't on our list. Browse everything we do instead.
        </p>
        <Link
          to="/"
          hash="services"
          data-ocid="service.back_link"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-sm bg-primary px-5 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-smooth hover:-translate-y-0.5 hover:shadow-hard-sm"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to services
        </Link>
      </section>
    );
  }

  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <>
      <section
        data-ocid="service.hero_section"
        className="relative overflow-hidden border-b border-border bg-hero-gradient"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blueprint opacity-60"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <Link
            to="/"
            hash="services"
            data-ocid="service.back_link"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All services
          </Link>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="grid size-14 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
                <ServiceIcon icon={service.icon} />
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-5xl">
                {service.name}
              </h1>
              <p className="label-mono mt-3 text-primary">{service.tagline}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {service.description}
              </p>
            </div>

            <div className="w-full shrink-0 rounded-sm border border-border bg-card p-5 md:w-72">
              <p className="label-mono text-muted-foreground">Talk to us now</p>
              <a
                href={telLink()}
                data-ocid="service.phone_link"
                className="mt-2 block font-mono text-xl font-bold text-primary transition-colors hover:text-primary/80"
              >
                {BUSINESS.phoneDisplay}
              </a>
              <div className="mt-5 flex flex-col gap-3">
                <CallButton
                  className="w-full"
                  data-ocid="service.call_button"
                />
                <WhatsAppButton
                  className="w-full"
                  data-ocid="service.whatsapp_button"
                  message={`Hi Que Professional Services, I'd like a quote for ${service.name.toLowerCase()}.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-ocid="service.includes_section"
        className="border-b border-border bg-background py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>What's included</SectionLabel>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            Scope of work
          </h2>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-card px-5 py-5 text-sm text-foreground"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-sm border border-primary/40 bg-primary/5 px-6 py-6">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                Get a free quote for {service.name.toLowerCase()}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No obligation. We'll visit the site and price it properly.
              </p>
            </div>
            <QuoteButton
              data-ocid="service.quote_button"
              service={service.name}
            />
          </div>
        </div>
      </section>

      <section
        data-ocid="service.other_section"
        className="bg-muted/30 py-16 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel>Also available</SectionLabel>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            Other services
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                data-ocid={`service.other_link.${item.slug}`}
                className="group flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-4 transition-smooth hover:-translate-y-0.5 hover:border-primary/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
                  <ServiceIcon icon={item.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                    {item.name}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {item.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <CallButton data-ocid="service.footer_call_button" />
            <WhatsAppButton data-ocid="service.footer_whatsapp_button" />
          </div>
        </div>
      </section>
    </>
  );
}
