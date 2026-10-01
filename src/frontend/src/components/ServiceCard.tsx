import { ServiceIcon } from "@/components/ServiceIcon";
import type { Service } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      data-ocid={`services.card.${service.slug}`}
      className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-smooth hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-hard-dark"
    >
      <span className="grid size-12 place-items-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
        <ServiceIcon icon={service.icon} />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-foreground">
        {service.name}
      </h3>
      <p className="label-mono mt-2 text-muted-foreground">{service.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
        View details
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
