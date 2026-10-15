# Keng Seng Choo website editing

This is an Astro static website. The parent directory holds local WordPress backups and migration evidence; only this `site/` directory is intended for a website source repository.

- Articles live in `src/content/articles/` as Markdown. Read an existing article and `docs/content-workflow.md` before adding one. Use the content schema in `src/content.config.ts`.
- Keep the artist's verified facts, original artwork titles, source credits and archival dates. Do not invent awards, exhibitions, techniques, artwork years, media, dimensions, prices or availability. Distinguish a translation from original writing.
- Keep stable slugs and routes. Article listings, exhibition listings and archive search derive automatically from the content collection.
- Drafts default to true. A draft omitted from the generated site is still visible if committed in a public repository. Keep private drafts and unpublished images outside a public repository.
- Respect the user's publishing instructions already established in the conversation. Prepare a preview before asking for any decision that is actually needed; avoid repeated approval requests for authorized edits.
- Public images go in `public/media/` after optimization and review. Never copy a WordPress directory, SQL dump, configuration, original credentials or an entire family photo folder into public output.
- User decision: publish only images referenced in WordPress content. The 211 recovered personal collection candidates remain excluded. The original VIP gallery could not be matched, so omit VIP images and the empty VIP section. A temporary password `password` was previously allowed, but no gate is needed until a matching collection is explicitly selected.
- The public contact page contains only the original email and Facebook. Do not reintroduce the home address or phone numbers from the raw backup.
- Run `npm run build` and `npm run validate` after content or template changes. Check representative pages in a browser for layout changes. If the parent migration workspace is unavailable, use the portable checks described in the workflow guide.
- Set `SITE_BASE` for a GitHub project-path deployment and `SITE_URL` to the real hosting origin. Do not hardcode an unowned domain. Template links use `href()`; Markdown links use root-relative paths and are rewritten during the build.
- Migration scripts in the parent directory are a one-time import. Do not rerun them over edited content; compare changes or use a fresh staging copy.
- SEO and AI-search content must follow `docs/seo-and-sources.md`. Use verifiable artist credentials and dated collecting records. Do not invent current demand, scarcity, investment returns, reviews, prices or artwork media. Keep structured data consistent with visible content and actual artwork records. Never change historical article dates to make them appear new.
- After SEO/schema changes, build with the production `SITE_URL`/`SITE_BASE`, then run `npm run validate:seo` as well as the general validator.
- Keep light and dark themes consistent through the colour tokens in `src/styles/global.css`. Preserve the saved/device preference behaviour and accessible header switch. Check text contrast, mobile navigation and the artwork viewer in both themes; never apply colour filters to artwork images.
