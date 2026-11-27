# Artist archive expansion — 27 November 2026

## Purpose and visitor paths

Make kengsengchoo.com the central public archive for Keng Seng Choo 龚明金: paintings, career history, independent coverage and external collection records. No checkout or direct sales functionality is added.

The existing visual system, light/dark themes, original artwork routes and bilingual archive are retained. The principal paths are:

- Discover the artist → biography → exhibition record → original institutional source.
- Explore paintings → collections and galleries → credited artwork → external host.
- Read an interview or publication record → original publisher or preserved archival article.

Navigation: The Artist, Artworks, Exhibitions, Articles, Collections, Contact. On small screens it becomes a two-column menu. Existing URLs remain available.

## Milestone 1 — exhibition history

Added seven newly written records: Taipei Fine Arts Museum (1987), One Culture: Two Perspectives (2012), Maybank (2019), Malaysia–Korea exchange (2022), and Younie Gallery exhibitions (2022, 2024, 2026). The exhibition page orders confirmed dates chronologically. Incomplete-date historical announcements remain in a separately labelled archive section.

New articles use 27 November 2026 as their actual publication date, `archived: false`, and distinct historical `eventStart`/`eventEnd` values. They are summaries with citations, not newly discovered original newspaper texts. Production build, general validation and SEO validation passed at this milestone.

## Milestone 2 — publications, collections and imagery

Added three more articles: Oriental Daily's 25 December 2019 group exhibition coverage, the publisher-confirmed 2011 interview chapter in 朵拉's 心路2, and Bank Negara Malaysia's commentary on Fishing Village. The book's full interview was not retrieved and is not summarised. Oriental Daily interviews other artists; the new entry states this explicitly.

Added `/collections/`, illustrating works from external hosts and linking to institutional records, gallery profiles and dated auction catalogues. These links do not imply current representation, availability or valuations. The original 14-work archive stays separately identified.

Selected eight public images under the owner's express authorisation: three Younie exhibition posters, one painting illustrated in Oriental Daily, Fishing Village from the museum catalogue, two Daiichi paintings and Three Sisters from ArtSafe. Each was visually reviewed, reduced to WebP without colour filters or composition cropping, and credited with an original source link. Other artists' paintings on exhibition posters are not identified as works by Keng Seng Choo.

The source register is `src/data/references.json`; `reference-media.json` records each selected image's source page, original image URL, dimensions and credit. Complete fetched source documents remain outside the public repository in the parent workspace's `output/archive-expansion-2026-11-27/` folder. Private recovered family material remains excluded.

Maybank's catalogue confirms Kampung Nelayan, 1992, watercolour on paper, 56 × 76 cm, on printed page 47 (PDF page 25). Exhibition participation is not treated as proof of Maybank ownership. Fishing Village is not equated with Kampung Nelayan without further evidence.

Kyoto University's index independently supports the existing 1985 interview; its actual indexed author is 鍾錫金, consistent with the original website's simplified credit. An additional reference is appended without replacing the preserved scans or archival date.

## Milestone 3 — integration and publication

Expanded the homepage, archive entry points and biography milestones. All ten new articles remain searchable alongside the original 31. Reference panels show the publisher, original URL and the date the link was checked. New Article structured data includes the same visible source URLs as citations; external artwork images are not given unsupported sale offers or artwork metadata.

An isolated Chrome review covered six representative pages at 1440px and 390px, in light and dark themes (24 page/theme/width combinations). Checks passed for image loading, horizontal overflow, mobile navigation, archive search and empty results, and both the poster and original artwork viewers. Source checks are point-in-time checks; external hosts can change later. All 25 registered source, direct artwork and selected image URLs returned successful responses during preparation. Existing historical source links in preserved WordPress text are not represented as newly verified links.

The dependency updates already present on both remote repositories were merged without changing their selected versions. Publication retains the existing GitHub Pages hosting and synchronises the artist and hosting source repositories.

## Maintenance

Before adding an article, follow `content-workflow.md`. Add verified references to the register and use `sourceIds`; use `referenceImageId` only for an explicitly selected, credited public image. Preserve publication dates and distinguish original text from new writing. The source and image components fail a build for unknown IDs.

To recheck registered links and image provenance, run `npm run validate:references` (or add `-- --live` for network checks). Run the production build, general validator and SEO validator after changes. Review new layouts at desktop and phone widths in both themes. Recheck new live pages after deployment.
