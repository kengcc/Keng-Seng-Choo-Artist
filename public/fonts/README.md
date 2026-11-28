# Local webfonts

Typography selected by the owner on 28 November 2026:

- Cormorant Garamond Medium (500), normal and italic, for display headings and the artist tagline.
- Source Sans 3, regular (400), semibold (600), bold (700) and regular italic, for body copy and controls.

These files are static Latin web subsets. Supported ranges are U+0020–024F, U+1E00–1EFF, U+2000–214F, U+2190–21FF and U+FFFD where present in the source. Standard composition, kerning, ligature and mark positioning features are retained. Chinese text uses the site's existing system fallbacks. No Chinese font download is required.

The modified Source Sans 3 subsets have the internal family **KSC Body**, respecting the upstream reserved name “Source.” Their letterforms remain Source Sans 3. Both families retain their original copyright and license metadata; licenses are included beside these files.

Sources:

- https://github.com/CatharsisFonts/Cormorant/tree/master/fonts/webfonts
- https://github.com/adobe-fonts/source-sans/tree/release/WOFF2/TTF

`provenance.json` records each original Git blob, source SHA-256 and derived file sizes. Subsets were generated using fontTools 4.69.1, with standard Latin layout features and retained name/license records. WOFF2 and WOFF versions contain the same glyphs. The website prefers WOFF2, then tries WOFF, then installed serif/sans-serif fallbacks. Faces use `font-display: swap`; only the regular body and medium heading files are preloaded. All fonts are served from this website, without a Google Fonts or other external font request.

Font declarations live in `src/components/FontFaces.astro` and use the site's base-path helper. Files are committed build assets; regenerating fonts is not a dependency of the website build.
