# Fenil Shah Portfolio

A personal portfolio site built with Next.js 16, React 19, Tailwind CSS 4, shadcn/ui primitives, and Markdown content. The site presents Fenil Shah's full-stack engineering work, side projects, and contact information.

## What This Project Includes

- A single-page home route with hero, selected work, about, and contact sections.
- A filterable projects index at `/projects`, with case study pages at `/projects/[slug]`.
- Markdown and frontmatter content stored in `content/`.
- A content build script that mirrors Markdown and images into `public/` for static access and LLM crawlers.
- Dark-mode-first theming with `next-themes`.
- Framer Motion animations and reusable shared UI components.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Radix primitives
- Framer Motion
- `react-markdown`, `remark-gfm`, and `rehype-slug`

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

Run the linter:

```bash
pnpm lint
```

## Deployment (Vercel)

This site is set up to deploy to Vercel with zero extra configuration:

1. Push the repo to GitHub and import it in the Vercel dashboard (framework auto-detects as Next.js).
2. Add environment variables under **Project → Settings → Environment Variables** (see `.env.example`). At minimum, set `RESEND_API_KEY` so the contact form can send mail.
3. Deploy. `pnpm build` runs `build:content` first (via `prebuild`), so the content mirror is generated automatically.

The contact form posts to the `app/api/contact` route, which emails the message via [Resend](https://resend.com). Without a verified sending domain, set `CONTACT_FROM_EMAIL` to Resend's `onboarding@resend.dev` sender (the default) — it delivers to the Resend account owner's address, which is the intended recipient here.

## Project Structure

- `app/` contains App Router pages, layout metadata, and global CSS imports.
- `components/home/` contains sections used on the home page.
- `components/projects/` contains project listing and case study UI.
- `components/layout/` contains site-wide navigation, footer, and theme controls.
- `components/shared/` contains reusable UI, markdown rendering, CTAs, badges, and animation helpers.
- `components/ui/` contains generated shadcn/ui primitives.
- `lib/data/` contains server-only content loading helpers.
- `scripts/build-content.mjs` mirrors content assets and generates `public/llms.txt`.

## Notes

- Data loading helpers are server-only and should not be imported directly into Client Components.
- Project Markdown uses root-level `##` headings as case study steps.
- The hero and about sections use `public/images/profile.svg` as a placeholder; replace it with a real photo.
- `next.config.mjs` intentionally ignores TypeScript build errors and disables Next image optimization.
