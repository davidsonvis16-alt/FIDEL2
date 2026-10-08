# Fidel Castrol — Student Success Coach

Portfolio site for Fidel Castrol.

## Stack

|               |                                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| Framework     | React 19 + TypeScript, built with Vite                                                  |
| Styling       | Tailwind CSS v4 (theme tokens in `src/index.css`), `clsx` + `tailwind-merge` via `cn()` |
| Animation     | Motion (`motion/react`, formerly Framer Motion)                                         |
| Smooth scroll | Lenis (`lenis/react`) — also handles anchor links with sticky-nav offset                |
| Lightbox      | yet-another-react-lightbox (zoom, captions, counter), lazy-loaded on first open         |
| Icons         | lucide-react                                                                            |
| Fonts         | Self-hosted via Fontsource: Archivo (variable width), Instrument Sans, Caveat           |
| Quality       | ESLint (typescript-eslint, react-hooks) + Prettier (with Tailwind class sorting)        |

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint
npm run format
```

Deploy on Vercel: import the repo, preset **Vite**, defaults are fine.

## Editing content

All copy lives in `src/data.ts` — skills, experience, automation steps, screenshots, contact.

## To do

- Add Fidel's photo as `public/images/fidel.jpg` (portrait, ~900×1100). Until then the hero shows an "FC" placeholder.
