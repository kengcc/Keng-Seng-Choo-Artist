# Adding articles through prompts

Ask the assistant in this project to add or update an article. Supply the facts, original text, dates, source credit and photographs. The assistant edits the files, checks the build and shows a preview; publication follows your instructions.

Example:

> Add an article about Dad's exhibition using the attached announcement and photographs. Preserve the Chinese text and photo captions, draft an English translation for review, and show the preview.

## Content structure

Each article is a Markdown file in `src/content/articles/`. Copy an existing entry's metadata structure. A new entry needs a title, quoted ISO date, stable slug, route, summary, language (`en`, `zh` or `en-zh`), kind (`article`, `exhibition` or `interview`), tags and draft state. `wordpressId` is optional for new content. Set `archived: false` for a newly written article.

Use `/articles/your-stable-slug/` for the route and the same slug in the `slug` field. Filenames are editorial identifiers; the route controls the public URL. Use Markdown headings, paragraphs, links and images. Supply meaningful alternative text and preserve captions/source attribution. Do not manufacture a missing translation.

Keep article publication dates distinct from exhibition dates in the body. Confirm current facts rather than treating historical statements or photograph dates as current artwork metadata. Archives should preserve their original dates.

The public paintings are in `src/data/artworks.json`. Artwork titles come from the original gallery or article captions. Unknown fields remain null. Preserve each painting's `slug` when correcting its title so its established URL stays stable. Recovered collection candidates live outside this site and require an explicit selection before inclusion.

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

The main navigation is The Artist, Artworks, Exhibitions, Articles, Collections, and Contact. Recognition and collecting history belong on the artist page; institutional records and external gallery links belong at `/collections/`; practical collecting questions belong at `/collectors/`. Preserve existing URLs when changing labels.

New summaries may use `sourceIds` from `src/data/references.json`. Check the original page, confirm the artist identity and record the check date before linking. Use `archived: false` and the actual new article publication date; historical exhibition dates belong in the event fields. `referenceImageId` selects a credited image from `reference-media.json`. The owner authorised suitable imagery from verified external reference sites on 27 November 2026; recovered private material remains excluded.

Earlier year-only exhibition records live in `src/data/earlier-exhibitions.json`, separately labelled on the exhibitions page. Keep source IDs, date precision and attribution; do not manufacture opening dates from a year. The artist page's selected milestones are ordered newest first. A dated press article about an exhibition can appear in the exhibition timeline while retaining its press classification.

Articles may include `section` (`events`, `press`, `writing`, `artworks`, or `updates`). Use `press` for reports and reviews even when they discuss exhibitions. Do not imply a contributor's writing was authored by the artist. Language labels and the archive filter use the `language` field. An original duplicate may be omitted from listings while its page and canonical link remain intact.

For confirmed dates in the original announcement, add `eventStart`, optional `eventEnd` (ISO dates), and `eventVenue`. Keep the original article `date` intact; it is displayed as the publication date. Never infer an event year from a publication date alone.

Artwork records use `category` (`pigeons` or `figures`) for visitor browsing and `sourceContext` to explain the original publication. Only add works already published in WordPress or explicitly selected by the owner. Preserve all existing slugs. The two earlier oil paintings have source attachment/article references, rather than NextGEN picture IDs. Add medium, creation year, dimensions and bilingual titles only when verified in the source. Artwork enquiry emails include the title and stable reference automatically.

## Voice of the artist’s primary website

Write new editorial content in a clear, professional third-person voice on behalf of the artist’s website. Lead with the exhibition, artwork, publication or career event: “Keng Seng Choo participated in…” / “龚明金参与了…”. External institutions and galleries are references, rather than the subject of a report about researching the artist. Keep publication facts attributed where needed, especially catalogue artwork descriptions and library holdings.

Keep source links, credits and verification dates in the reference registry. Show references and publisher names to visitors; routine link-check dates belong in the registry. Avoid public process notes such as “we found”, “cross-checked”, “this verifies”, “已查阅” or “本网站不作补写”. Omit unknown details without inventing them. Explain uncertainty briefly when a visible claim would otherwise mislead, such as conflicting dates. An auction listing remains a listing, a library’s book remains a book, and a translated description must not become an invented original title. Preserve original historical articles, their dates and contributor voices.

## Paintings on gallery and auction websites

The Collections page's illustrated paintings are in `src/data/external-artworks.json`. Each entry links a registered source and selected reference image, with title, optional original Chinese title, creation year (or null), medium, dimensions and an artwork page. Auction entries also identify the catalogue date and lot; these are distinct from creation dates. Preserve source spelling of titles, including ArtSafe's “Gotong Rayon”, and source media without silently adding “on paper”. “Work on paper” for the untitled Wells entry is a descriptive label, with its unnamed status stated beside it.

Check the individual artwork page, artist identity and image/caption pairing, and compare against existing images before adding an entry. Repeated auction appearances are not separate works; shared titles alone do not establish a duplicate. Keep different paintings with the same title/year distinct through their source, lot and dimensions. Do not infer titles for unknown works, sale results, current availability or gallery representation. Store source-check dates and original image URLs in the registries; public captions provide concise credits and original links. Filters operate on the displayed collection, and the image viewer follows the visible selection.

Owner decision, 28 November 2026: each painting on Collections must show only one image and one latest verified catalogue/reference link. Compare images across titles and auction appearances; update the existing entry to the latest source rather than displaying another card. Use the latest source’s title, details and image. Do not show previous auction links, alternate-title histories or repeated-auction notes on the public page. Keep evidence of older records in internal research files when useful. Different compositions remain separate paintings even if their titles match.

## Collection overview and dedicated pages

`/collections/` is a compact overview with museum context and five illustrated collection links. Full artwork records belong on the source collection pages: Daiichi Art, KL Lifestyle Art Space, Henry Butcher, ArtSafe, and the smaller Wells/Davidson group. Membership, cover selection and introductory copy live in `src/data/collection-groups.json`; pages are generated at `/collections/[collection]/`. Every painting must belong to exactly one group, with one full entry and one latest source reference. Main-page cover images are navigation previews, not additional auction entries. Keep the established `/collections/#galleries` and `#catalogues` anchors. Search, medium filters and the viewer apply to the individual collection.

## Approved visual theme

The owner selected Gallery & Jade for default light mode and Midnight & Gold for dark mode on 28 November 2026. Keep colours in the shared CSS tokens and theme-colour metadata consistent. New visitors start in light; preserve a saved choice. Use full paintings beside headlines, a portrait-led artist introduction and a relevant featured-exhibition poster. Keep Artworks/Collections headings compact. Use relevant article previews/covers with existing credits, and keep original historical text/scans intact. Paintings must remain uncropped, proportional and unfiltered in both themes; do not apply artwork hover zoom. See `theme-rollout-2026-11-28.md`.

## Family archive additions and homepage selection

Four owner-supplied watermarked photographs were selected on 28 November 2026; their public-media provenance is in `src/data/family-artwork-media.json`. Preserve their original pixels, colour profile and watermark while stripping camera/location metadata. Unknown titles use `labelType: descriptive`, while retaining their existing display names without “Descriptive label” badges or title-status notes; unknown dates, media and dimensions remain null. `displayGroup: article-illustration` keeps the two small 2007 works out of the main grids without deleting their routes or original article. Curate the three fixed homepage works first in `src/lib/home-artworks.ts`; derive the random hero pool from the remaining main-gallery works. See `gallery-refresh-2026-11-28.md`.
