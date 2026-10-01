export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  icon: "concrete" | "roofing" | "remodeling" | "pest" | "plumbing";
}

export interface ServiceArea {
  town: string;
  note: string;
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface GalleryItem {
  id: string;
  serviceSlug: string;
  serviceName: string;
  caption: string;
  location: string;
  image: string;
  alt: string;
}

export const BUSINESS = {
  name: "Que Professional Services",
  shortName: "Que",
  phoneDisplay: "+268 7948 9466",
  phoneDial: "+26879489466",
  whatsapp: "26879489466",
  email: "sibisiquinton07@gmail.com",
  addressLine: "Simunye, Eswatini L301",
  region: "Lubombo, Eswatini",
  hours: "Mon–Sat · 07:00–18:00",
  mapQuery: "Simunye, Eswatini",
} as const;

export const WHATSAPP_MESSAGE =
  "Hi Que Professional Services, I'd like a free quote for a job in Simunye.";

export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${BUSINESS.phoneDial}`;
}

export function mailtoLink(subject = "Quote request"): string {
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}`;
}

export function mapsDirectionsLink(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    BUSINESS.mapQuery,
  )}`;
}

export function mapsEmbedLink(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    BUSINESS.mapQuery,
  )}&output=embed`;
}

export const SERVICES: Service[] = [
  {
    slug: "concrete",
    name: "Concrete Works",
    tagline: "Foundations, slabs & driveways",
    description:
      "Structural concrete built to spec and built to last. We pour foundations, slabs, driveways, retaining walls and yard paving for homes and small commercial sites across the Lubombo region.",
    includes: [
      "Site set-out and leveling",
      "Foundations, footings and slabs",
      "Driveways, paths and yard paving",
      "Retaining walls and boundary strips",
      "Reinforcement and formwork",
      "Curing, finishing and clean-up",
    ],
    icon: "concrete",
  },
  {
    slug: "roofing",
    name: "Roofing",
    tagline: "New roofs, repairs & waterproofing",
    description:
      "From a full roof replacement to a stubborn leak, we work with IBR, corrugated iron, tiles and trusses. Every roof is checked for structure, fall and drainage before we close it up.",
    includes: [
      "New roof installation and re-roofing",
      "Truss supply and fitting",
      "Leak detection and repair",
      "Gutter and downpipe installation",
      "Roof waterproofing and sealing",
      "Storm-damage repairs",
    ],
    icon: "roofing",
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    tagline: "Kitchens, bathrooms & extensions",
    description:
      "We remodel the rooms you actually live in. Kitchens, bathrooms, tiling, ceilings, partitions and room additions — planned properly, dust-managed, and finished to a standard you'd show off.",
    includes: [
      "Kitchen and bathroom renovations",
      "Tiling, screeding and plastering",
      "Ceilings and drywall partitions",
      "Room additions and extensions",
      "Doors, windows and built-in cupboards",
      "Painting and finishing",
    ],
    icon: "remodeling",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    tagline: "Safe, targeted treatment",
    description:
      "Cockroaches, rodents, ants, termites and bed bugs handled with the right treatment for the right pest. We inspect first, treat properly, and tell you exactly what to expect afterwards.",
    includes: [
      "Full property inspection",
      "Cockroach, ant and rodent control",
      "Termite treatment and prevention",
      "Bed bug and flea treatment",
      "Safe, family-conscious application",
      "Follow-up visit and advice",
    ],
    icon: "pest",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    tagline: "Leaks, geysers & installations",
    description:
      "Reliable plumbing for homes and small businesses. We trace leaks, replace burst pipes, fit geysers and install bathrooms — and we leave the site dry and tidy when we're done.",
    includes: [
      "Leak detection and pipe repair",
      "Geyser installation and service",
      "Bathroom and kitchen plumbing",
      "Drain and sewer unblocking",
      "Taps, toilets and fittings",
      "Water tank and pump connections",
    ],
    icon: "plumbing",
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  { town: "Simunye", note: "Home base — same-day callouts" },
  { town: "Mhlume", note: "Full service coverage" },
  { town: "Tshaneni", note: "Full service coverage" },
  { town: "Big Bend", note: "Full service coverage" },
  { town: "Siteki", note: "Scheduled visits" },
  { town: "Matsapha", note: "Scheduled visits" },
  { town: "Manzini", note: "Scheduled visits" },
  { town: "Mbabane", note: "By arrangement" },
];

export const TRUST_STATS: TrustStat[] = [
  { value: "5", label: "Trades under one team" },
  { value: "Free", label: "On-site quotes" },
  { value: "7 days", label: "A week availability" },
  { value: "100%", label: "Workmanship focus" },
];

export const SERVICE_OPTIONS = SERVICES.map((service) => service.name);

export const GALLERY: GalleryItem[] = [
  {
    id: "concrete-driveway",
    serviceSlug: "concrete",
    serviceName: "Concrete Works",
    caption: "Reinforced driveway and apron poured for a family home.",
    location: "Simunye",
    image: "/assets/generated/gallery-concrete-driveway.dim_1024x768.jpg",
    alt: "Freshly finished concrete driveway with clean expansion joints leading to a house",
  },
  {
    id: "concrete-slab",
    serviceSlug: "concrete",
    serviceName: "Concrete Works",
    caption: "Slab and footings set out and poured for a new extension.",
    location: "Mhlume",
    image: "/assets/generated/gallery-concrete-slab.dim_1024x768.jpg",
    alt: "Steel reinforcement mesh laid over a prepared concrete slab foundation",
  },
  {
    id: "roofing-replacement",
    serviceSlug: "roofing",
    serviceName: "Roofing",
    caption: "Full IBR roof replacement with new gutters and downpipes.",
    location: "Tshaneni",
    image: "/assets/generated/gallery-roofing-replacement.dim_1024x768.jpg",
    alt: "New corrugated metal roof installed on a residential house under a clear sky",
  },
  {
    id: "roofing-repair",
    serviceSlug: "roofing",
    serviceName: "Roofing",
    caption: "Leak traced and sealed before the rainy season.",
    location: "Big Bend",
    image: "/assets/generated/gallery-roofing-repair.dim_1024x768.jpg",
    alt: "Roofer sealing a metal roof seam with waterproofing membrane",
  },
  {
    id: "remodeling-kitchen",
    serviceSlug: "remodeling",
    serviceName: "Remodeling",
    caption: "Kitchen stripped back, re-tiled and refitted end to end.",
    location: "Siteki",
    image: "/assets/generated/gallery-remodeling-kitchen.dim_1024x768.jpg",
    alt: "Renovated kitchen with new tiling, cabinetry and countertops",
  },
  {
    id: "remodeling-bathroom",
    serviceSlug: "remodeling",
    serviceName: "Remodeling",
    caption: "Bathroom remodel with new tiling, fittings and ceiling.",
    location: "Matsapha",
    image: "/assets/generated/gallery-remodeling-bathroom.dim_1024x768.jpg",
    alt: "Modern renovated bathroom with tiled walls, new basin and shower",
  },
  {
    id: "pest-control-treatment",
    serviceSlug: "pest-control",
    serviceName: "Pest Control",
    caption: "Targeted termite treatment with a follow-up inspection.",
    location: "Manzini",
    image: "/assets/generated/gallery-pest-control.dim_1024x768.jpg",
    alt: "Technician in protective gear applying pest control treatment along a building perimeter",
  },
  {
    id: "plumbing-geyser",
    serviceSlug: "plumbing",
    serviceName: "Plumbing",
    caption: "Geyser replaced and pipework re-routed for a rental unit.",
    location: "Mbabane",
    image: "/assets/generated/gallery-plumbing-geyser.dim_1024x768.jpg",
    alt: "Plumber fitting a new geyser and copper pipework in a utility area",
  },
  {
    id: "plumbing-bathroom",
    serviceSlug: "plumbing",
    serviceName: "Plumbing",
    caption: "Bathroom plumbing installed for a new build.",
    location: "Simunye",
    image: "/assets/generated/gallery-plumbing-bathroom.dim_1024x768.jpg",
    alt: "Newly installed bathroom plumbing with taps, toilet and shower fittings",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
