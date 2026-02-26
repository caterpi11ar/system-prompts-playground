# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build (also validates all static pages)
pnpm lint         # ESLint
```

No test framework is configured.

## Architecture

This is a Next.js 15 (App Router) static site that displays AI tool system prompts. All pages are statically generated (SSG) at build time.

### Data flow

`docs/` directory (filesystem) → `lib/tools.ts` (scanner) → pages

- **`docs/`** — Contains all prompt data. Each subdirectory is an AI tool (e.g., `docs/Anthropic/Claude Code/Prompt.txt`). Supported file types: `.txt`, `.json`, `.yaml`, `.yml`.
- **`lib/tools.ts`** — Core data layer. Recursively scans `docs/` at build time using `fs.readdirSync`. Directory names become tool names; names are slugified for URLs. Contains hardcoded `CATEGORY_MAP`, `COLOR_MAP`, and `ICON_MAP` keyed by slug. Results are cached in-memory.

### Routes

- **`/`** (`app/page.tsx`) — Homepage showing all tools as colored badges. Server component.
- **`/tools/[slug]`** (`app/tools/[slug]/page.tsx`) — Tool detail page with tabbed prompt viewer. Uses `generateStaticParams` from `getAllSlugs()`.

### Adding a new AI tool

1. Create a directory under `docs/` with prompt files (`.txt`, `.json`, `.yaml`, `.yml`)
2. Add its slug to `CATEGORY_MAP`, `COLOR_MAP`, and `ICON_MAP` in `lib/tools.ts`
3. Place its logo in `public/logos/`

### Key components

- **`components/prompt-viewer.tsx`** — Client component for tabbed file viewing with copy-to-clipboard
- **`components/site-header.tsx`** — Client component with theme toggle and GitHub link
- **`components/ui/`** — Minimal shadcn/ui subset (badge, button, tabs, scroll-area only)

### Styling

Tailwind CSS 4 with `tw-animate-css`. Global styles in `app/globals.css`. Dark mode via `next-themes` (class strategy).

### Deployment

Vercel with static generation. The `docs/` directory must be committed to git — it is read at build time via `process.cwd()`.
