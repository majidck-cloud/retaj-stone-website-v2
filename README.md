# Retag Stone — Complete Project

Premium natural stone website built with Vite + Tailwind CSS v4 + GSAP.

## What's Included

| File | Purpose |
|------|---------|
| `index.html` | Entry HTML file |
| `src/style.css` | All CSS — Tailwind v4 @import + custom styles for all 10 sections |
| `src/main.js` | All JavaScript — GSAP animations, scroll triggers, language toggle |
| `vite.config.ts` | Vite configuration with @tailwindcss/vite plugin |
| `package.json` | Dependencies and scripts |
| `package-lock.json` | Locked dependency versions |
| `dist/` | Pre-built production output (ready to deploy) |

## All 10 Sections

1. **Hero** — Full-screen with parallax background, animated headline, stats counter
2. **Material Strip** — Horizontal scroll gallery of 6 stone types (marble, granite, quartz, etc.)
3. **About** — Split-screen story with pinned image, quote block, animated stats
4. **Services** — Bento grid layout with 6 service tiles, hover glow effects
5. **Portfolio** — Full-screen slideshow with 5 projects, scroll-driven transitions
6. **Process Timeline** — 4-step vertical timeline with SVG path draw animation
7. **Testimonials** — Dual-row auto-scrolling marquee with 6 client reviews
8. **Social Strip** — Horizontal scrollable Instagram/TikTok tile gallery
9. **Contact / Closing** — Cinematic closing statement with parallax background
10. **Footer** — Minimal premium footer with wordmark, nav, social icons

## Tech Stack

- **Vite** v8.2.1 — Build tool
- **Tailwind CSS** v4.3.3 — Utility-first CSS framework
- **@tailwindcss/vite** v4.3.3 — Official Vite plugin
- **GSAP** v3.15.0 — Animation library (ScrollTrigger included)

## Quick Start

```bash
# 1. Extract the zip
cd retag-stone-vite

# 2. Install dependencies
npm install

# 3. Start dev server with hot reload
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
# → Output in dist/

# 5. Preview production build
npm run preview
# → http://localhost:4173
```

## Deploy the Pre-Built dist/

The `dist/` folder is already built and ready to deploy to any static host:

```bash
cd dist
npx serve .
# → http://localhost:3000
```

## Features

- **RTL + LTR** — Full Arabic/English bilingual support with `dir="rtl"` / `dir="ltr"`
- **Responsive** — Mobile-first, breakpoints at 768px and 1024px
- **Reduced Motion** — Respects `prefers-reduced-motion: reduce`
- **Custom Cursor** — Bronze ring cursor on desktop (hidden on touch devices)
- **Loading Screen** — Animated logo + progress bar on first load
- **Scroll Animations** — GSAP ScrollTrigger for all section entrances
- **Language Toggle** — One-click Arabic ↔ English switch

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

ISC
