# hungryraccoonapp.com

The public website for **HungryRaccoon**, a restaurant discovery app for Phnom Penh that is still in the making.

This is a plain static page: HTML, CSS, fonts and images. It has no build step and no backend, and it is served by GitHub Pages on `hungryraccoonapp.com`. It has no download links, email collection or analytics.

The app itself lives in a separate private repository. This repo holds only what the public site needs.

## Editing

Run `npx serve` here and visit http://localhost:3000. Links use clean addresses (`/about`, not `/about.html`), which GitHub Pages and `serve` both resolve to the `.html` file; `python3 -m http.server` doesn't, so links between pages 404 there. The `.html` addresses keep working too. Every push to `main` publishes.

## What's in it

| File | What it is |
|---|---|
| `index.html`, `style.css` | The page |
| `fonts.css`, `assets/font-*.ttf` | DM Sans and Fraunces, from Google Fonts (SIL Open Font License) |
| `assets/logo.png` | The raccoon logo |
| `assets/food.jpg` | AI-generated illustrative food image, not a photo of a real restaurant's dish |
| `assets/app-welcome.jpg`, `assets/app-areas.jpg`, `assets/app-tastes.jpg` | October 3, 2026 simulator screenshots supplied by the owner, edited with image generation to remove the blue development overlay and set the time to 9:41. The area screen uses the later capture with Chamkarmon and Russei Keo selected. Used for the welcome and onboarding previews. |
| `i18n.js` | The English / Khmer / French switch on the homepage. English stays in `index.html`; this file holds the Khmer and French, keyed by each element's `data-i18n`, `data-i18n-alt` or `data-i18n-aria`. The choice is kept in `localStorage` on the visitor's device (not a cookie, never sent) and can be linked with `?lang=km` or `?lang=fr`. The Khmer and French were drafted by Claude and need a fluent speaker's review. The privacy and terms pages (#8) and the app screenshots (#9) stay English for now |
| `site.js` | Makes the in-page links (How it works, Take a peek inside, Back to the top) scroll to their section without adding `#preview`, `#launch` and so on to the address bar, while still moving keyboard focus there. The links work as plain anchors without it |
| `assets/khmer-*.ttf` | Noto Sans Khmer and Noto Serif Khmer, from Google Fonts (SIL Open Font License). `unicode-range` means they download only when Khmer text is on screen |
| `CNAME` | Tells GitHub Pages the custom domain |
| `about.html`, `contact.html` | About and Contact pages, in the same layout as the privacy policy and terms. AI assistants look for these (with the privacy policy) to check a business is real. English only for now, like the legal pages |
| `llms.txt` | A plain-text summary for AI assistants ([llmstxt.org](https://llmstxt.org/) format), including when to suggest HungryRaccoon and when not to. Keep it in step with the About page |
| `check.mjs` | `node check.mjs` checks the live site (or `node check.mjs http://localhost:3000`): `llms.txt`, the About and Contact pages, the homepage's Organization data, the sitemap and footer links |

## What GitHub Pages can't do

Some AI-readiness checks (isagentic.com, #18) want the homepage and 404 page served as Markdown when a client asks with `Accept: text/markdown`, and a `Vary: Accept` header. GitHub Pages serves the same file to everyone and can't do this. It needs the Cloudflare move (hungryraccoon-hq/hungryraccoon#86). The Organization data has no postal `address` until the company is registered.

## October 2026 website refresh

The homepage now uses the welcome screen and adds neighbourhood and cuisine previews. Ratings are labelled as in the test build, verified against `RateSheet.tsx`, `useRating.ts`, and `RestaurantScreen.tsx` in the app repository. Search and sign-in copy was checked against `SearchScreen.tsx` and `AuthSheet.tsx`. Lists and friends remain marked coming soon. Only the public website was changed. The moving ticker uses a filled, asymmetric starburst drawn in SVG.

## Social icons

The footer uses locally hosted brand SVGs from [Font Awesome Free 6](https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs/brands), replacing hand-drawn approximations. License and attribution are included in `assets/social/LICENSE.txt`.
