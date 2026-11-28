# Option 2 typography — 28 November 2026

The owner selected the expressive gallery direction: Cormorant Garamond for larger headings and the artist tagline, with Source Sans 3 for body text and controls. The typography should complement the paintings while keeping English and Chinese text readable on phones. Site colours, page structure, original content, source links, artwork display and the border arrow remain unchanged.

## Fonts and delivery

The site hosts static, optimized font files with their licenses. Cormorant Garamond is medium weight 500, including a genuine italic. Source Sans 3 supplies 400, 600 and 700, plus genuine regular italic; its modified web subsets have the internal name KSC Body because the upstream license reserves Source. No font installation or third-party font request is needed. Existing Chinese serif/sans-serif system fallbacks remain in the stacks.

The two preloaded WOFF2 faces total 81,124 bytes (about 79 KiB). Other weights and italics load only when rendered. WOFF versions support browsers that cannot use WOFF2, and installed fonts remain available if both downloads fail. Font files are static rather than variable, with `font-display: swap`. Original source blob identifiers, hashes, licenses and subset details are in `public/fonts/`.

## Hierarchy and mobile readability

- Large titles and headings: medium Cormorant Garamond, with its more delicate proportions compensated by generous display sizes.
- Artist name: responsive 72–116px desktop scale, with a 52–72px phone scale. No decorative full stop is added.
- Hero tagline: medium italic, 27px desktop and 25px phone.
- Body: Source Sans 3, 16px baseline; phone article prose, summaries and artwork description copy are 17px.
- Small captions and viewer captions: the clearer sans-serif, rather than the display serif at small sizes.
- Supporting phone text and footer: 14px; archive dates remain secondary text.
- Existing phone Menu text is 16px and section-jump links are 14px; their navigation structure is unchanged.
- The wordmark uses semibold 600; heavier text uses an actual 700 face.

## Validation

The production build and general, SEO and reference validators pass. Browser review covers representative English/Chinese articles, artist, exhibition, artwork, collection, contact and collecting pages at 320, 390, 768 and 1440px in light and dark modes. Checks verify loaded font families/weights, no horizontal overflow, readable phone sizes, image loading, mobile navigation and the updated artwork selector/viewer. All 112 combinations passed. Separate failure simulations check WOFF fallback and readable installed fonts when every font download is blocked. These simulations do not establish identical rendering on physical older Windows or phone hardware.

The owner's subsequent mobile-navigation observation is recorded as a suggestion task only: a more visibly actionable Explore button, a visible section-link row, or a sticky header. This typography release does not change the navigation structure.

After increasing the existing mobile Menu label to 16px and section links to 14px, 24 further phone checks passed across six representative routes, two narrow widths and both themes. The wordmark and header controls stay on one row and there is no horizontal overflow.
