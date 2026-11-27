# Collections overview and dedicated pages — 28 November 2026

The Collections page is now a compact directory, with five artwork-cover links and the existing institutional context. Daiichi Art and KL Lifestyle Art Space receive the two prominent cards; smaller collections follow. The previous 59-work grid no longer loads on the overview.

| Collection | Route | Paintings |
| --- | --- | --- |
| Daiichi Art | `/collections/daiichi-art/` | 30 |
| KL Lifestyle Art Space | `/collections/kl-lifestyle-art-space/` | 16 |
| Henry Butcher Art Auctioneers | `/collections/henry-butcher/` | 8 |
| ArtSafe, Singapore | `/collections/artsafe/` | 3 |
| Wells & Davidson Auctions | `/collections/other-auctions/` | 2 |

Each full painting entry appears on exactly one collection page. Covers on the overview are navigation previews, with credits and a link to the relevant collection. The existing artwork metadata, selected image registry and source-reference registry are unchanged. Every full entry continues to show one latest reference only.

The source groups and covers are declared in `src/data/collection-groups.json`. Each dedicated page includes an introduction, collection navigation, a link back to the overview, search, relevant medium filters and the scoped image viewer. Collections breadcrumbs are included in visible navigation and structured data. The established `#galleries` and `#catalogues` overview anchors remain available. The historical Praise of Pigeons route remains intact.

Validation passed: production build, general checks across 146 HTML files, SEO across 76 indexed pages, reference/collection membership checks, and 24 page/theme/viewport browser combinations covering the overview and all five collections. Desktop and mobile checks covered navigation, artwork counts, exactly one source link per painting, search including Chinese titles, medium filtering, empty results and image viewing. With JavaScript disabled, the artworks and source links remain available and unused filters stay hidden. All 59 paintings are assigned once, with no gaps or duplicate full entries.
