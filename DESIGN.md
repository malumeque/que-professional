# Design Brief

## Direction

Industrial-Editorial — a stamped engineering drawing crossed with a job-site safety sign for Que Professional Services, a home-services contractor in Simunye, Eswatini.

## Tone

Dark, structural, and slightly brutalist: sharp corners, hairline blueprint grids, and one hi-vis safety-amber accent. Confidence and competence over softness — the visitor is about to spend money on a stranger and needs to feel they are dealing with a professional.

## Differentiation

A blueprint-grid surface system with hard offset block-shadows (solid amber blocks behind cards and CTAs, never blurs) plus mono-set phone numbers — every contact detail reads like an engineering spec.

## Color Palette

| Token      | OKLCH         | Role                                    |
| ---------- | ------------- | --------------------------------------- |
| background | 0.16 0.018 160 | Deep graphite-green-black page field    |
| foreground | 0.94 0.008 150 | Near-white primary text                 |
| card       | 0.21 0.02 160  | Elevated panel / service-card surface   |
| primary    | 0.78 0.16 78   | Safety amber — CTAs, numbers, highlights |
| accent     | 0.62 0.13 42   | Muted copper — WhatsApp / secondary CTA  |
| muted      | 0.25 0.02 160  | Recessed strips, input fields           |

## Typography

- Display: Space Grotesk — hero and section headings, bold, tight tracking, uppercase for impact.
- Body: DM Sans — paragraphs, UI labels, form fields; legible at phone sizes.
- Mono: JetBrains Mono — phone numbers, section labels, trust annotations.
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `label-mono`, body `text-base md:text-lg`.

## Elevation & Depth

Flat surfaces separated by hairline borders; depth comes from hard offset block-shadows (solid amber/dark blocks, 4–6px) and layered blueprint grid, never soft blurs.

## Structural Zones

| Zone    | Background            | Border     | Notes                                          |
| ------- | --------------------- | ---------- | ---------------------------------------------- |
| Header  | `bg-card/95` backdrop | `border-b` | Sticky; amber click-to-call button on the right |
| Content | `bg-background`       | —          | Alternate `bg-muted/30` + blueprint-grid bands |
| Footer  | `bg-muted/40`         | `border-t` | Business details, service-area list, contact   |

## Spacing & Rhythm

Generous section gaps (`py-16 md:py-24`), tight internal card padding (`p-6`), 24px blueprint grid unit, hairline 1px dividers between stat blocks.

## Component Patterns

- Buttons: sharp 4px corners; primary = amber solid with `shadow-hard` offset on hover; secondary = transparent with amber border; WhatsApp = copper.
- Cards: 4px radius, `bg-card`, 1px `border-border`, amber bottom-border accent, `shadow-hard-dark` on hover.
- Badges: square-ish 2px radius, `label-mono`, amber text on `primary/10` tint.

## Motion

- Entrance: sections fade-and-rise 12px over 0.4s ease-out, staggered.
- Hover: buttons translate -2px with hard shadow growing; cards lift `-translate-y-0.5`.
- Decorative: subtle pulse on the WhatsApp badge; no bouncy or looping motion.

## Constraints

- Dark mode is the primary and only theme.
- No soft blurred shadows, no pill buttons, no purple gradients.
- All colors via OKLCH semantic tokens; no raw hex or arbitrary color classes.
- Mobile-first: sticky call/WhatsApp bar must remain reachable on small screens.

## Signature Detail

The blueprint grid + hard offset block-shadow system: surfaces sit on a faint 24px technical grid and CTAs cast a solid amber stamped block rather than a blur — a material/treatment detail that makes the brand feel built, not designed.
