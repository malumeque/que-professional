import { cn } from "@/lib/utils";
import type { Service } from "@/types";

const iconPaths: Record<Service["icon"], string> = {
  concrete: "M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6M9 11h.01M15 11h.01",
  roofing: "M2 12 12 4l10 8M5 12v8h14v-8M9 20v-5h6v5",
  remodeling: "M4 20V6a2 2 0 0 1 2-2h6v16M12 20h8V10h-8M7 8h2M7 12h2M15 14h2",
  pest: "M12 8v10M8 12H4M20 12h-4M8 16l-3 3M16 16l3 3M8 8 5 5M16 8l3-3M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  plumbing: "M6 4v6a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v2M6 4h4M18 20h-4M14 14v6",
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: Service["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <path d={iconPaths[icon]} />
    </svg>
  );
}
