# Keng Seng Choo Artist

A static artist portfolio and bilingual archive, built with Astro. Articles are Markdown files and can be added by prompting the assistant in this project. See [the content workflow](docs/content-workflow.md).

## Local preview

Use Node.js 24 or newer supported by Astro and install dependencies with `npm ci`. Run `npm run dev`, then open the local URL it prints. Run `npm run build` and `npm run validate` before publication.

The website contains the 31 published WordPress articles plus fourteen sourced editorial additions, seven unrestricted legacy pages and 14 paintings in its original artwork archive. Exhibition history includes 24 earlier, year-only records from gallery biographies. The Collections & Galleries overview links to institutional records and five dedicated collection pages containing 59 illustrated gallery and auction works, with titles, dates where known, media, dimensions, credits and original source links. Each collection has search, medium filters and an image viewer. The recovered private archive is kept outside this repository until a selection is made. The two near-duplicate articles retain their original records and routes.

## Hosting

The public artist source repository is [Keng Seng Choo Artist](https://github.com/kengcc/Keng-Seng-Choo-Artist). The existing [live website](https://kengsengchoo.com/) is deployed from `kengcc/kengsengchoo.com`; keep both repositories in sync when publishing. The workflow builds and validates both copies, and deploys only from the hosting repository at the custom domain.

The GitHub Actions workflow builds and publishes the `main` branch through GitHub Pages. Set the repository's Pages source to GitHub Actions. The production address is `https://kengsengchoo.com/`.

The workflow defaults to `SITE_URL=https://kengsengchoo.com` and `SITE_BASE=/`, matching the custom domain configured in GitHub Pages and `public/CNAME`. Optional repository variables override them; remove any old project-path overrides when publishing at the domain root. Local preview builds still default to `/` without a production origin.

To test the production deployment locally:

```sh
SITE_URL=https://kengsengchoo.com SITE_BASE=/ npm run build
SITE_BASE=/ npm run validate
SITE_URL=https://kengsengchoo.com npm run validate:seo
```

To test an alternative project-path deployment locally:

```sh
SITE_URL=https://kengcc.github.io SITE_BASE=/kengsengchoo.com/ npm run build
SITE_BASE=/kengsengchoo.com/ npm run validate
```

`dist/` is portable static output and can also be hosted on Cloudflare Pages. The build supplies exact legacy-path HTML redirects; `_redirects` adds server redirects on hosts that support it. GitHub Pages uses the HTML redirect pages. Old `?p=ID` links need the homepage's query-redirect behavior.

The build emits a sitemap, RSS feed and production robots rules when `SITE_URL` is configured. The unmatched VIP page and private collection are excluded. A local preview build without that variable disables indexing.

## Content and privacy

The unmatched VIP gallery and the 211 recovered personal collection candidates are excluded. Artwork referenced in WordPress content and suitable external-source images explicitly authorised by the owner belong in this site. Selected reference images retain provenance in `src/data/reference-media.json`; sources and link-check dates are in `src/data/references.json`. The public contact details are limited to email and Facebook.

Run `npm run validate:references` to check reference and image records, or `npm run validate:references -- --live` to recheck the registered public links. The live report is written to ignored `reports/reference-validation.json`. See [the archive expansion record](docs/archive-expansion-2026-11-27.md) and [the illustrated collections expansion](docs/collections-expansion-2026-11-28.md) for the additions and source distinctions.

Original WordPress backups, SQL exports, migration reports and excluded family photographs belong outside this source repository. Original artwork and press material retain their source attribution. Do not rerun the original import over subsequent editorial changes.

Deployment follows [Astro's official GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Visual theme

The default Gallery & Jade palette pairs warm white with jade and ochre; Midnight & Gold supplies the saved dark-mode option. Home, The Artist and Exhibitions have relevant image-led introductions. Painting grids remain compact, and artwork images are fully visible without cropping or recolouring. See [the theme rollout](docs/theme-rollout-2026-11-28.md).

The homepage selects one of eight original archive paintings per arrival. “Another painting” loads the next randomly chosen work on demand, with matching source details and enlargement; no automatic slideshow or full-set preload runs. Selection lives in `src/components/HomePainting.astro` and derives its metadata from `artworks.json`.
