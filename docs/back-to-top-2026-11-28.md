# Back to top — 28 November 2026

The owner approved a compact upward-arrow button at bottom right for long pages. It is shared through Base.astro, so Exhibitions, Articles, Artworks and other long pages behave consistently. It remains hidden until the visitor scrolls one viewport down; short pages that cannot reach that threshold do not show it.

The control is 44 × 44 CSS pixels, uses the existing light/dark theme tokens and allows 20 pixels plus device safe-area insets at the right and bottom. Its accessible name is “Back to top”; keyboard focus is clearly outlined. Activation returns focus to the header home link and scrolls to the top. Scrolling is smooth unless reduced motion is requested. It is hidden while the artwork viewer is open and remains hidden when JavaScript is unavailable. Scroll updates are passive and coalesced with requestAnimationFrame; no new dependency or network request is needed.

Validation: production build plus general, SEO and reference validators pass. Browser coverage includes Exhibitions, Articles and Artworks at 320, 390, 768 and 1440 pixels in both themes: visibility threshold, touch activation, desktop keyboard activation, return to header focus, viewer suppression/restoration, reduced motion, size/position and no horizontal overflow. Phone screenshots were reviewed in both themes, and the no-JavaScript state was checked.
