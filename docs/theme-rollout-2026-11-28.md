# Gallery & Jade / Midnight & Gold — 28 November 2026

The owner selected the Gallery & Jade concept as the default and Midnight & Gold as dark mode, with image-led page layouts and fully visible paintings. This implementation retains the existing content and collection structure.

## Palette and display

| Token | Gallery & Jade | Midnight & Gold |
| --- | --- | --- |
| Page background | `#f8f7f3` | `#17232c` |
| Main text | `#25342d` | `#f0ecdf` |
| Secondary text | `#59645d` | `#bcc4c6` |
| Links and buttons | `#285145` | `#d1b47c` |
| Ochre/gold accent | `#b38c48` | `#d1b47c` |
| Artwork mount | `#ebece5` | `#22313b` |

Light mode remains the default for new visitors, regardless of operating-system colour scheme. The accessible header switch saves the visitor's choice. Inline initial theme colour, interactive switching and browser theme-colour metadata match the CSS palettes. Artwork pixels receive no colour filters. Text contrast across the page, mount and panel backgrounds exceeds 4.5:1 for primary, secondary and link colours in both modes.

## Page treatments

- Home: a complete, uncropped Sisterly Love (2020) beside the artist's name, with caption, Daiichi Art credit/source link and enlargement. The short introduction and calls to action follow the approved concept. Verified credentials follow the hero; the artist introduction and selected works remain below.
- The Artist: a prominent portrait beside the name and introduction, with biography, career and recognition navigation. The existing English/Chinese biography and newest-first milestones remain.
- Exhibitions: a featured 2026 When the South Wind Is Blowing poster and event introduction above the timeline. It is labelled a featured exhibition, not an upcoming event. The poster is fully visible and opens in the viewer. On mobile the feature title leads into the complete poster, followed by dates, venue and the short introduction.
- Articles and interviews: compact, relevant image previews where an existing article image is available. Text-only articles keep their text layout. The listing starts directly with search and filters, with a direct link to the artist’s statement; the earlier three-card text introduction has been removed. Preview links open the article, not an unrelated image viewer.
- Individual articles: selected source images/posters lead relevant stories as a cover figure, with their existing credits and source links. Original historical scans stay in their original article content.
- Artworks and Collections: compact headings and the existing artwork grids or five collection-directory covers. No generic banner is added. Dedicated collection pages retain search, medium filtering and a single latest reference per painting.

Paintings and posters use proportional dimensions and `object-fit: contain` where a fixed preview box is needed. They are not used as cropped background images or text backdrops. The artwork hover zoom has been removed. Relevant captions and metadata remain outside images. A narrow-phone wrapping issue in the Artworks heading was corrected during responsive checks.

The 45 article files, 14 original artwork records, 59 external artwork records, selected image registry and latest source references are unchanged. No new source downloads, claims of sale or image retouching are part of this change.

## Validation

The production build and general, SEO and reference validators passed: 146 HTML pages, 45 articles, 76 structured pages, 14 artwork pages and 59 external artworks. Browser checks passed across 112 combinations of 14 representative routes, four widths (320, 390, 768 and 1440 pixels) and both themes. Checks included image loading, horizontal overflow, mobile navigation, enlargement, article and collection search, collection counts, newest-first milestones, default light mode and saved theme preference. A further 24 desktop/mobile screenshots covered the final page layouts in both modes, with visible images loaded before review. Primary, secondary and link text exceeded 4.5:1 contrast on tested page and panel backgrounds in both themes.
