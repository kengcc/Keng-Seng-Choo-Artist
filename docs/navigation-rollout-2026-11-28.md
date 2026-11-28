# Visible main navigation — 28 November 2026

The owner selected six always-visible main section links on mobile and removed the Menu/Explore control. The theme switch stays beside the artist's name. There is no expandable menu or duplicated section list.

- Phones up to 700px: two rows of three links, 16px labels and at least 44px-high touch targets.
- Tablets and narrower desktops up to 1100px: a single row of six equal-width links below the identity/theme row.
- Wider desktops: retain the existing horizontal header navigation.
- The current section is highlighted and underlined. Subpages use `aria-current="location"`, exact section landing pages use `aria-current="page"`; press/interviews highlights Articles and collecting/enquiries highlights Contact.
- Navigation uses ordinary links and remains available without JavaScript. Obsolete menu controls, toggle code and menu-open styles have been removed.

The artist statement remains linked from The Artist and Articles, and now has a direct footer link. Press & interviews and Collecting & enquiries remain linked from their relevant pages and the footer. Artwork data, images, source references, fonts and themes are unchanged.

The production build and general, SEO and reference validators are required before publication, with browser checks for visible links, active section, keyboard focus, theme switching, phone touch size, overflow, additional page access and JavaScript-disabled navigation.

Validation completed: 108 browser combinations (nine routes × six widths × two themes) passed, including 320px phones and both sides of the 1100px desktop breakpoint. All six links are visible, mobile/tablet targets are at least 44px with 16px labels, active sections are correct, footer links are present and no horizontal overflow occurs. Keyboard navigation, theme switching and JavaScript-disabled navigation passed. The production build and all three validators passed.
