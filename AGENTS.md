# Project Guidance

## User Preferences

- Business name: Que Professional Services
- Contact email: sibisiquinton07@gmail.com
- WhatsApp and phone: +268 7948 9466
- Location: Eswatini, Simunye L301
- Services offered: concrete, roofing, remodeling, pest control, plumbing
- Use Google Maps for location and navigation
- Mobile-first, professional, trustworthy local-business tone

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Enhanced Migration with check-limit=1 allows only one pending migration; fold all new stable fields into the single pending migration file rather than adding a second timestamped migration.
- Motoko has no triple-quoted multi-line string literal; author long static text as concatenated single-quoted strings with explicit \n escapes.
- tsconfig restricts global types, so @testing-library/jest-dom matcher types need a src/*.d.ts with a triple-slash reference for tsc to pick them up.
- Cross-route CTA intent works by storing a pending value plus dispatching a window event, so a form reacts whether it is already mounted or mounts after navigation.
- Google Maps embed without an API key works via https://www.google.com/maps?q=<query>&output=embed; directions via https://www.google.com/maps/dir/?api=1&destination=<query>.
