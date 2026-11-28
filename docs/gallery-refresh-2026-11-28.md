# Gallery refresh — 28 November 2026

The main Artworks page now contains eight pigeons and eight Figures & Malaysian Life works. Peaceful Life and Kampung Life retain their original detail URLs and illustrations in “New Paintings in Dai Ichi Modern Art Gallery” (1 January 2007). An Earlier article illustrations area links both works and the article without promoting the small images in the main grids.

The homepage fixed selections were curated first for variety: Mirror (pigeons), Village Pigeons (expressive figures), and Fishing village with boats (village landscape). The other 13 main-gallery works form the disjoint random hero pool. Shared configuration lives in `src/lib/home-artworks.ts`. Freedom is the no-JavaScript fallback. Selection loads on demand and never advances automatically.

## Added photographs

- IMG_4994.jpg: Pigeons in flight (descriptive label).
- IMG_4988.jpg: Harvest scene (descriptive label).
- IMG_5007.jpg: Fishing village with boats (descriptive label).
- IMG_5010.jpg: Women with jars and pigeons (descriptive label).

These four owner-supplied photographs were compared against existing paintings before inclusion. No formal title, creation date, medium or dimensions are invented. Full JPEGs preserve decoded original pixels, existing watermarks and ICC profiles; camera/location metadata was stripped. Proportional WebP thumbnails keep grids lighter. Public provenance, hashes and processing notes are in `src/data/family-artwork-media.json`; private folder paths and location values are excluded. Additional supplied candidates were not needed to reach eight per section.

All 14 earlier artwork records remain, with only the two placement flags added. All 45 original/current article files are unchanged. External collection records and their latest-reference policy are unchanged.

## Validation

Production build and general, SEO and reference validators passed: 150 HTML pages, 18 artwork detail schemas, 45 article schemas, and no reported errors. Browser checks passed across 72 route/viewport/theme combinations at 320, 390, 768 and 1440 pixels, in light and dark modes. Verified 8+8 main works, full-image enlargement, no horizontal overflow, earlier article illustrations, descriptive labels, three fixed selections and a disjoint 13-work hero cycle. No-JavaScript fallback was checked. Phone and desktop screenshots were reviewed.
