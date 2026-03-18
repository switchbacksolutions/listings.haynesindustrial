# Haynes Industrial — Equipment Listings Site

Commercial equipment and salvage materials listing site for
[Haynes Industrial](https://haynesindustrial.com), hosted at
[listings.haynesindustrial.com](https://listings.haynesindustrial.com).

Built on the [Astro.js Launchpad](https://github.com/switchbacksolutions/astrojs-launchpad)
template by [Switchback Solutions](https://www.switchbacksolutions.net/).

---

## About this site

Haynes Industrial does demolition, recycling, and waste management in Northern
California. This subdomain lists salvaged equipment and materials from their
projects. There is no e-commerce — all inquiries go directly to
[jon@haynesindustrial.com](mailto:jon@haynesindustrial.com).

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Astro](https://astro.build) | ^4 | Static site generator |
| [TypeScript](https://typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^3 | Utility-first CSS |
| [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) | ^3 | MDX support |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | ^3 | Auto sitemap |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | ^4 | RSS feed |
| [Vitest](https://vitest.dev) | ^2 | Unit testing |
| [Playwright](https://playwright.dev) | ^1.49 | E2E testing |

---

## Quick start

```bash
git clone https://github.com/switchbacksolutions/astrojs-launchpad.git haynes-listings
cd haynes-listings
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

---

## Scripts

```bash
npm run dev         # Start dev server at http://localhost:4321
npm run build       # Build for production → dist/
npm run preview     # Preview the production build locally
npm run check       # Run astro check + TypeScript
npm test            # Run Vitest unit tests
npm run test:e2e    # Run Playwright E2E tests
npm run test:all    # Run unit + E2E tests
```

---

## Project layout

```
src/
  components/     # Reusable Astro components
  content/blog/   # Markdown / MDX listing posts
  layouts/        # Page shell layouts
  pages/          # File-based routes
  styles/         # Global CSS + Tailwind layers
tests/
  e2e/            # Playwright browser tests
  unit/           # Vitest unit tests
docs/
  TESTING.md      # Testing guide
  DEPLOYMENT.md   # Deployment guide
```

---

## Adding a listing

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'Item Title'
description: 'Short description of the equipment or material.'
pubDate: '2024-03-01'
tags:
  - equipment
  - steel
draft: false
---

Listing details go here.
```

---

## Deployment

Connected to [Netlify](https://netlify.com). The `netlify.toml` configures the
build command, publish directory, Node version, security headers, and caching
rules automatically.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full instructions.

---

## License

MIT

---

## Credits

Based on [Astro.js Launchpad](https://github.com/switchbacksolutions/astrojs-launchpad)
by [Switchback Solutions](https://www.switchbacksolutions.net/).
