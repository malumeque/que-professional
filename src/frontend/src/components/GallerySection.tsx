import { SectionLabel } from "@/components/ActionButtons";
import { cn } from "@/lib/utils";
import { GALLERY, SERVICES } from "@/types";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";

const ALL = "all";

export function GallerySection() {
  const [active, setActive] = useState<string>(ALL);

  const filters = useMemo(
    () => [
      { slug: ALL, name: "All work" },
      ...SERVICES.map((service) => ({
        slug: service.slug,
        name: service.name,
      })),
    ],
    [],
  );

  const items = useMemo(
    () =>
      active === ALL
        ? GALLERY
        : GALLERY.filter((item) => item.serviceSlug === active),
    [active],
  );

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="scroll-mt-20 border-b border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>Recent work</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Jobs we've finished
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A look at completed work across the Lubombo region. Filter by the
            trade you need to see how we finish.
          </p>
        </div>

        <fieldset
          aria-label="Filter gallery by service"
          data-ocid="gallery.filters"
          className="mt-8 flex flex-wrap gap-2 border-0 p-0"
        >
          {filters.map((filter) => {
            const isActive = filter.slug === active;
            return (
              <button
                key={filter.slug}
                type="button"
                data-ocid={`gallery.filter.${filter.slug}`}
                aria-pressed={isActive}
                onClick={() => setActive(filter.slug)}
                className={cn(
                  "h-10 rounded-sm border px-4 font-display text-xs font-semibold uppercase tracking-wider transition-smooth",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary",
                )}
              >
                {filter.name}
              </button>
            );
          })}
        </fieldset>

        {items.length === 0 ? (
          <p
            data-ocid="gallery.empty_state"
            className="mt-10 rounded-sm border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground"
          >
            No completed work to show for this service yet.
          </p>
        ) : (
          <ul
            data-ocid="gallery.grid"
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <li
                key={item.id}
                data-ocid={`gallery.item.${item.id}`}
                className="group overflow-hidden rounded-sm border border-border bg-card transition-smooth hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-hard-dark"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-sm border border-primary/40 bg-background/85 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary backdrop-blur">
                    {item.serviceName}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.caption}
                  </p>
                  <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <MapPin
                      className="size-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {item.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
