# Adding articles through prompts

Ask the assistant in this project to add or update an article. Supply the facts, original text, dates, source credit and photographs. The assistant edits the files, checks the build and shows a preview; publication follows your instructions.

Example:

> Add an article about Dad's exhibition using the attached announcement and photographs. Preserve the Chinese text and photo captions, draft an English translation for review, and show the preview.

## Content structure

Each article is a Markdown file in `src/content/articles/`. Copy an existing entry's metadata structure. A new entry needs a title, quoted ISO date, stable slug, route, summary, language (`en`, `zh` or `en-zh`), kind (`article`, `exhibition` or `interview`), tags and draft state. `wordpressId` is optional for new content. Set `archived: false` for a newly written article.

Use `/articles/your-stable-slug/` for the route and the same slug in the `slug` field. Filenames are editorial identifiers; the route controls the public URL. Use Markdown headings, paragraphs, links and images. Supply meaningful alternative text and preserve captions/source attribution. Do not manufacture a missing translation.

Keep article publication dates distinct from exhibition dates in the body. Confirm current facts rather than treating historical statements or photograph dates as current artwork metadata. Archives should preserve their original dates.

The 2016 public paintings are in `src/data/artworks.json`. Artwork titles come from the original gallery or article captions. Unknown fields remain null. Preserve each painting's `slug` when correcting its title so its established URL stays stable. Recovered collection candidates live outside this site and require an explicit selection before inclusion.

## Preview and checks

Install locked dependencies with `npm ci`. Use `npm run dev` for the local preview, `npm run build` for static output, and `npm run validate` for links, content and asset checks. The validator accepts additional articles; its migration baseline remains 31 WordPress articles.

The migration workspace supplies extra privacy/provenance checks when available. The website should also build and validate independently when the site directory is cloned on its own.

`SITE_URL` is the hosting origin, such as the eventual GitHub Pages origin. `SITE_BASE` is `/repository-name/` for a project site or `/` for a custom-domain root. All internal links and media must work in both configurations. Production builds generate a sitemap, RSS feed and robots rules when `SITE_URL` is configured; local preview builds disable indexing.

## Publication and rollback

Only the site source and explicitly selected public media belong in the website repository. Keep backups, migration records, source photographs, private drafts and excluded artwork outside it. Build output lives in `dist/` and can be hosted by GitHub Pages or Cloudflare Pages.

Version each approved change in Git. The deployment workflow publishes the selected branch; revert a content commit and redeploy to restore an earlier version. Recheck the website after deployment, including an article, an artwork image and an old URL.

The original VIP gallery could not be matched and is omitted. The recovered personal collection remains excluded. Add only artwork referenced in WordPress content or subsequently selected explicitly by the owner. Keep the public contact page limited to email and Facebook.

## Artist identity and visitor structure

Keng is the family name; Seng Choo is the given name. Keep the full public name as Keng Seng Choo. The homepage groups the given name together, and the shared Person data specifies both parts explicitly.

The main navigation is The Artist, Artworks, Articles & Events, and Contact. Recognition and collecting history belong on the artist page; practical collecting questions belong at `/collectors/`. Preserve existing URLs when changing labels.

Articles may include `section` (`events`, `press`, `writing`, `artworks`, or `updates`). Use `press` for reports and reviews even when they discuss exhibitions. Do not imply a contributor's writing was authored by the artist. Language labels and the archive filter use the `language` field. An original duplicate may be omitted from listings while its page and canonical link remain intact.

For confirmed dates in the original announcement, add `eventStart`, optional `eventEnd` (ISO dates), and `eventVenue`. Keep the original article `date` intact; it is displayed as the publication date. Never infer an event year from a publication date alone.

Artwork records use `category` (`pigeons` or `figures`) for visitor browsing and `sourceContext` to explain the original publication. Only add works already published in WordPress or explicitly selected by the owner. Preserve all existing slugs. The two earlier oil paintings have source attachment/article references, rather than NextGEN picture IDs. Add medium, creation year, dimensions and bilingual titles only when verified in the source. Artwork enquiry emails include the title and stable reference automatically.
